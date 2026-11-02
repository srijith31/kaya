const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const { clientUrl, rateLimit: rateLimitConfig } = require('../config/env');
const { adminApiKey } = require('../config/env');

const securityHeaders = helmet();
const corsOptions = {
  origin: clientUrl.split(',').map(origin => origin.trim()),
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};
const bookingLimiter = rateLimit({ windowMs: rateLimitConfig.windowMs, limit: rateLimitConfig.max, standardHeaders: 'draft-8', legacyHeaders: false, message: { success: false, error: 'Too many requests. Please try again later.' } });

function sanitizeBody(req, res, next) {
  if (req.body && typeof req.body === 'object') req.body = mongoSanitize.sanitize(req.body);
  next();
}

function requireAdminKey(req, res, next) {
  if (!adminApiKey || req.get('x-admin-key') !== adminApiKey) return res.status(401).json({ success: false, error: 'Admin authentication required' });
  next();
}

module.exports = { securityHeaders, corsMiddleware: cors(corsOptions), bookingLimiter, sanitizeBody, requireAdminKey };
