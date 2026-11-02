const mongoose = require('mongoose');

const pilotBookingSchema = new mongoose.Schema({
  bookingReference: { type: String, required: true, unique: true, index: true, immutable: true },
  contactName: { type: String, required: true, trim: true, maxlength: 120 },
  companyName: { type: String, required: true, trim: true, maxlength: 160 },
  businessEmail: { type: String, required: true, trim: true, lowercase: true, maxlength: 254, index: true },
  phone: { type: String, required: true, trim: true, maxlength: 30 },
  industry: { type: String, required: true, trim: true, maxlength: 120 },
  jobRole: { type: String, trim: true, maxlength: 120 },
  companyLocation: { type: String, required: true, trim: true, maxlength: 160 },
  employeeCount: { type: Number, required: true, min: 1, max: 1000000 },
  expectedParticipants: { type: Number, required: true, min: 20, max: 50 },
  preferredStartDate: { type: Date, required: true },
  requirements: { type: String, required: true, trim: true, maxlength: 3000 },
  consentToContact: { type: Boolean, required: true, validate: value => value === true },
  status: { type: String, enum: ['new', 'contacted', 'scheduled', 'confirmed', 'rejected'], default: 'new', index: true },
  internalNotes: { type: String, trim: true, maxlength: 5000 },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('PilotBooking', pilotBookingSchema);
