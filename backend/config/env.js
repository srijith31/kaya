const dotenv = require('dotenv');

dotenv.config();

const required = ['MONGODB_URI'];
if (process.env.NODE_ENV === 'production') {
  const missing = required.filter(key => !process.env[key]);
  if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

module.exports = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  email: {
    resendApiKey: process.env.RESEND_API_KEY,
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
    founder: process.env.EMAIL_FOUNDER || 'teamkayasupport@gmail.com',
  },
  adminApiKey: process.env.ADMIN_API_KEY || '',
  admin: {
    email: process.env.ADMIN_EMAIL || '',
    passwordHash: process.env.ADMIN_PASSWORD_HASH || '',
    tokenSecret: process.env.ADMIN_TOKEN_SECRET || '',
    tokenTtl: process.env.ADMIN_TOKEN_TTL || '8h',
  },
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 900000),
    max: Number(process.env.RATE_LIMIT_MAX || 100),
  },
};
