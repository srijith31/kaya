const { admin } = require('../config/env');
const { verifyAdminToken } = require('../utils/adminToken');
const { verifyPassword } = require('../utils/password');

function login(req, res) {
  if (!admin.email || !admin.passwordHash || !admin.tokenSecret) return res.status(503).json({ success: false, error: 'Admin authentication is not configured' });
  const { email, password } = req.body || {};
  if (typeof email !== 'string' || typeof password !== 'string') return res.status(401).json({ success: false, error: 'Invalid credentials' });
  if (email !== admin.email || !verifyPassword(password, admin.passwordHash)) return res.status(401).json({ success: false, error: 'Invalid credentials' });
  return res.json({ success: true, token: require('../utils/adminToken').createAdminToken(email), role: 'founder' });
}

function requireAdmin(req, res, next) {
  const token = req.get('authorization')?.replace(/^Bearer\s+/i, '');
  const user = verifyAdminToken(token);
  if (!user) return res.status(401).json({ success: false, error: 'Authentication required' });
  req.admin = user;
  next();
}

module.exports = { login, requireAdmin };
