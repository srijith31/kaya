const nodemailer = require('nodemailer');
const { email } = require('../config/env');

let transporter;
if (email.host && email.user && email.password && email.from) {
  transporter = nodemailer.createTransport({
    host: email.host,
    port: email.port,
    secure: email.port === 465,
    auth: { user: email.user, pass: email.password },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000,
  });
}

async function sendMail(message) {
  return Promise.race([
    transporter.sendMail(message),
    new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP request timed out')), 7000)),
  ]);
}

async function sendBookingConfirmation({ bookingType, booking }) {
  if (!transporter || !email.from) return { sent: false, reason: 'Email service is not configured' };
  const results = [];
  try {
    await sendMail({
      from: email.from,
      to: booking.businessEmail,
      subject: `Kaya ${bookingType} request received`,
      text: `Thanks for contacting Kaya. Your reference is ${booking.bookingReference}. The Kaya team will confirm next steps separately.`,
    });
    results.push('company');
  } catch (error) {
    console.error('Company confirmation email failed:', error.message);
  }
  try {
    await sendMail({
      from: email.from,
      to: email.founder || 'teamkayasupport@gmail.com',
      subject: `New Kaya ${bookingType} enquiry: ${booking.bookingReference}`,
      text: [
        `A new Kaya ${bookingType} enquiry was received.`,
        `Reference: ${booking.bookingReference}`,
        `Company: ${booking.companyName}`,
        `Contact: ${booking.fullName || booking.contactName}`,
        `Email: ${booking.businessEmail}`,
        `Phone: ${booking.phone || 'Not provided'}`,
        `Industry: ${booking.industry}`,
        `Received: ${booking.createdAt.toISOString()}`,
      ].join('\n'),
    });
    results.push('founder');
  } catch (error) {
    console.error('Founder notification email failed:', error.message);
  }
  return results.length ? { sent: true, deliveredTo: results } : { sent: false, reason: 'Email delivery failed' };
}

module.exports = { sendBookingConfirmation };
