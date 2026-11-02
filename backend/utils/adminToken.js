const crypto = require('node:crypto');
const { admin } = require('../config/env');

function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function sign(input) {
  return crypto.createHmac('sha256', admin.tokenSecret).update(input).digest('base64url');
}

function createAdminToken(email) {
  const header = encode({ alg: 'HS256', typ: 'KAYA' });
  const payload = encode({ sub: email, role: 'founder', exp: Math.floor(Date.now() / 1000) + ttlSeconds(admin.tokenTtl) });
  return `${header}.${payload}.${sign(`${header}.${payload}`)}`;
}

function ttlSeconds(value) {
  const match = /^(\d+)([smhd])$/.exec(value);
  if (!match) return 8 * 60 * 60;
  const units = { s: 1, m: 60, h: 3600, d: 86400 };
  return Number(match[1]) * units[match[2]];
}

function verifyAdminToken(token) {
  const [header, payload, signature] = String(token || '').split('.');
  if (!header || !payload || !signature || !admin.tokenSecret) return null;
  const expected = sign(`${header}.${payload}`);
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return decoded.exp > Math.floor(Date.now() / 1000) && decoded.role === 'founder' ? decoded : null;
  } catch {
    return null;
  }
}

module.exports = { createAdminToken, verifyAdminToken };
