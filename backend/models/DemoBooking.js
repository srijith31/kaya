const mongoose = require('mongoose');

const demoBookingSchema = new mongoose.Schema({
  bookingReference: { type: String, required: true, unique: true, index: true, immutable: true },
  fullName: { type: String, required: true, trim: true, maxlength: 120 },
  companyName: { type: String, required: true, trim: true, maxlength: 160 },
  businessEmail: { type: String, required: true, trim: true, lowercase: true, maxlength: 254, index: true },
  phone: { type: String, trim: true, maxlength: 30 },
  industry: { type: String, required: true, trim: true, maxlength: 120 },
  jobRole: { type: String, trim: true, maxlength: 120 },
  employeeCount: { type: Number, required: true, min: 1, max: 1000000 },
  preferredDate: { type: Date, required: true },
  preferredTime: { type: String, required: true, enum: ['morning', 'afternoon', 'late-afternoon'] },
  message: { type: String, trim: true, maxlength: 2000 },
  status: { type: String, enum: ['new', 'contacted', 'scheduled', 'confirmed', 'rejected'], default: 'new', index: true },
  internalNotes: { type: String, trim: true, maxlength: 5000 },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('DemoBooking', demoBookingSchema);
