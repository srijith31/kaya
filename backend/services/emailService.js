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

async function sendBookingConfirmation({ bookingType, booking }) {
  if (!resendEnabled && !transporter) return { sent: false, reason: 'Email service is not configured' };
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
