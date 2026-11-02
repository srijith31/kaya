const express = require('express');
const { asyncHandler } = require('../utils/asyncHandler');
const { bookingLimiter } = require('../middleware/security');
const { requireAdmin } = require('../middleware/adminAuth');
const { demoValidation, pilotValidation, handleValidationErrors } = require('../validators/bookingValidators');
const { createDemoBooking, createPilotBooking, listDemoBookings, listPilotBookings } = require('../controllers/bookingController');

const router = express.Router();
router.post('/demo', bookingLimiter, demoValidation, handleValidationErrors, asyncHandler(createDemoBooking));
router.post('/pilot', bookingLimiter, pilotValidation, handleValidationErrors, asyncHandler(createPilotBooking));
router.get('/demo', requireAdmin, asyncHandler(listDemoBookings));
router.get('/pilot', requireAdmin, asyncHandler(listPilotBookings));

module.exports = router;
