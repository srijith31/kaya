const nodemailer = require('nodemailer');
const { email } = require('../config/env');

const resendEnabled = Boolean(email.resendApiKey && email.from);
let transporter;
if (!resendEnabled && email.host && email.user && email.password && email.from) {
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

async function sendWithResend(message) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${email.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: message.from,
      to: [message.to],
      subject: message.subject,
      text: message.text,
    }),
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`Resend request failed (${response.status}): ${body.slice(0, 300)}`);
  return body;
}

async function sendMail(message) {
  if (resendEnabled) return sendWithResend(message);
  if (!transporter) throw new Error('Email service is not configured');
  return Promise.race([
    transporter.sendMail(message),
    new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP request timed out')), 7000)),
  ]);
}

async function sendBookingNotification({ bookingType, booking }) {
  if (!resendEnabled && !transporter) return { sent: false, reason: 'Email service is not configured' };
  try {
    await sendMail({
      from: email.from,
      to: email.founder || 'teamkayasupport@gmail.com',
      subject: `New Kaya ${bookingType} enquiry: ${booking.bookingReference}`,
      text: [
        `A new Kaya ${bookingType} enquiry was received.`,
        '',
        ...Object.entries(booking.toObject ? booking.toObject() : booking)
          .filter(([key]) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key))
          .map(([key, value]) => `${key}: ${value === undefined || value === '' ? 'Not provided' : value}`),
      ].join('\n'),
    });
    return { sent: true, deliveredTo: [email.founder || 'teamkayasupport@gmail.com'] };
  } catch (error) {
    console.error('Booking notification email failed:', error.message);
    return { sent: false, reason: 'Email delivery failed' };
  }
}

module.exports = { sendBookingNotification };
