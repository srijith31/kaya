const crypto = require('node:crypto');

function createBookingReference(prefix) {
  return `KAYA-${prefix}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

module.exports = { createBookingReference };
