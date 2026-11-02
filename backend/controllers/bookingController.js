const DemoBooking = require('../models/DemoBooking');
const PilotBooking = require('../models/PilotBooking');
const { createBookingReference } = require('../utils/bookingReference');
const { sendBookingNotification } = require('../services/emailService');

function publicBookingResponse(booking, type) {
  return { bookingReference: booking.bookingReference, type, status: booking.status, createdAt: booking.createdAt };
}

async function createBooking(Model, data, prefix, type) {
  const booking = await Model.create({ ...data, bookingReference: createBookingReference(prefix) });
  sendBookingNotification({ bookingType: type, booking }).catch(error => {
    console.error(`Booking email processing failed for ${booking.bookingReference}:`, error.message);
  });
  return booking;
}

async function createDemoBooking(req, res) {
  const booking = await createBooking(DemoBooking, req.body, 'DEMO', 'demo');
  res.status(201).json({ success: true, booking: publicBookingResponse(booking, 'demo'), email: 'notification attempted when configured' });
}

async function createPilotBooking(req, res) {
  const booking = await createBooking(PilotBooking, req.body, 'PILOT', 'pilot');
  res.status(201).json({ success: true, booking: publicBookingResponse(booking, 'pilot'), email: 'notification attempted when configured' });
}

async function listBookings(Model, type, req, res) {
  const limit = Math.min(Number(req.query.limit) || 25, 100);
  const page = Math.max(Number(req.query.page) || 1, 1);
  const [bookings, total] = await Promise.all([
    Model.find({}, { _id: 0, bookingReference: 1, status: 1, createdAt: 1 }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Model.countDocuments(),
  ]);
  res.json({ success: true, type, data: bookings, pagination: { page, limit, total } });
}

module.exports = {
  createDemoBooking,
  createPilotBooking,
  listDemoBookings: (req, res) => listBookings(DemoBooking, 'demo', req, res),
  listPilotBookings: (req, res) => listBookings(PilotBooking, 'pilot', req, res),
};
