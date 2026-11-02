const express = require('express');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { securityHeaders, corsMiddleware, sanitizeBody } = require('./middleware/security');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();
app.disable('x-powered-by');
app.use(securityHeaders);
app.use(corsMiddleware);
app.use(express.json({ limit: '20kb', strict: true }));
app.use(sanitizeBody);
app.get('/health', (req, res) => res.json({ success: true, service: 'kaya-bookings-api', status: 'ok' }));
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
