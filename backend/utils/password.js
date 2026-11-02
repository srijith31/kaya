const crypto = require('node:crypto');

function verifyPassword(password, storedHash) {
  const [salt, expected] = String(storedHash || '').split('$');
  if (!salt || !expected) return false;
  const actual = crypto.scryptSync(password, salt, 64).toString('hex');
  return actual.length === expected.length && crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}

module.exports = { verifyPassword };
