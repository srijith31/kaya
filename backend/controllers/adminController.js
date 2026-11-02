const DemoBooking = require('../models/DemoBooking');
const PilotBooking = require('../models/PilotBooking');

const models = { demo: DemoBooking, pilot: PilotBooking };
const allowedStatuses = ['new', 'contacted', 'scheduled', 'confirmed', 'rejected'];

function modelFor(type) {
  const Model = models[type];
  if (!Model) {
    const error = new Error('Invalid booking type');
    error.statusCode = 400;
    throw error;
  }
  return Model;
}

function queryFor(req) {
  const query = {};
  if (req.query.status && allowedStatuses.includes(req.query.status)) query.status = req.query.status;
  if (req.query.from || req.query.to) query.createdAt = {};
  if (req.query.from) query.createdAt.$gte = new Date(req.query.from);
  if (req.query.to) query.createdAt.$lte = new Date(`${req.query.to}T23:59:59.999Z`);
  if (req.query.search) {
    const term = req.query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    query.$or = [{ companyName: new RegExp(term, 'i') }, { businessEmail: new RegExp(term, 'i') }, { bookingReference: new RegExp(term, 'i') }];
  }
  return query;
}

async function listAdminBookings(req, res) {
  const Model = modelFor(req.params.type);
  const limit = Math.min(Number(req.query.limit) || 25, 100);
  const page = Math.max(Number(req.query.page) || 1, 1);
  const query = queryFor(req);
  const [data, total] = await Promise.all([Model.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), Model.countDocuments(query)]);
  res.json({ success: true, type: req.params.type, data, pagination: { page, limit, total } });
}

async function getAdminBooking(req, res) {
  const Model = modelFor(req.params.type);
  const booking = await Model.findOne({ bookingReference: req.params.reference }).lean();
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
  res.json({ success: true, booking });
}

async function updateAdminBooking(req, res) {
  const Model = modelFor(req.params.type);
  const update = {};
  if (req.body.status && allowedStatuses.includes(req.body.status)) update.status = req.body.status;
  if (typeof req.body.internalNotes === 'string') update.internalNotes = req.body.internalNotes.slice(0, 5000);
  if (!Object.keys(update).length) return res.status(400).json({ success: false, error: 'No valid updates supplied' });
  const booking = await Model.findOneAndUpdate({ bookingReference: req.params.reference }, update, { new: true, runValidators: true }).lean();
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
  res.json({ success: true, booking });
}

async function summary(req, res) {
  const [demo, pilot] = await Promise.all([DemoBooking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]), PilotBooking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])]);
  const counts = rows => Object.fromEntries(rows.map(row => [row._id, row.count]));
  res.json({ success: true, demo: counts(demo), pilot: counts(pilot) });
}

function csvValue(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

async function exportCsv(req, res) {
  const Model = modelFor(req.params.type);
  const bookings = await Model.find(queryFor(req)).sort({ createdAt: -1 }).lean();
  const columns = ['bookingReference', 'companyName', 'businessEmail', 'status', 'createdAt'];
  const csv = [columns.join(','), ...bookings.map(row => columns.map(column => csvValue(row[column])).join(','))].join('\n');
  res.type('text/csv').set('Content-Disposition', `attachment; filename=kaya-${req.params.type}-bookings.csv`).send(csv);
}

module.exports = { listAdminBookings, getAdminBooking, updateAdminBooking, summary, exportCsv };
