const express = require('express');
const { asyncHandler } = require('../utils/asyncHandler');
const { login, requireAdmin } = require('../middleware/adminAuth');
const { bookingLimiter } = require('../middleware/security');
const { listAdminBookings, getAdminBooking, updateAdminBooking, summary, exportCsv } = require('../controllers/adminController');

const router = express.Router();
router.post('/login', bookingLimiter, login);
router.use(requireAdmin);
router.get('/summary', asyncHandler(summary));
router.get('/bookings/:type', asyncHandler(listAdminBookings));
router.get('/bookings/:type/export', asyncHandler(exportCsv));
router.get('/bookings/:type/:reference', asyncHandler(getAdminBooking));
router.patch('/bookings/:type/:reference', asyncHandler(updateAdminBooking));

module.exports = router;
