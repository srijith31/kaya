const { body, validationResult } = require('express-validator');

const phone = value => /^[+]?[0-9\s().-]{7,20}$/.test(value);
const date = value => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) return false;
  const selected = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected >= today;
};

const demoValidation = [
  body('fullName').isString().trim().isLength({ min: 2, max: 120 }),
  body('companyName').isString().trim().isLength({ min: 2, max: 160 }),
  body('businessEmail').isEmail().normalizeEmail(),
  body('phone').optional({ values: 'falsy' }).custom(phone),
  body('industry').isString().trim().isLength({ min: 1, max: 120 }),
  body('employeeCount').isInt({ min: 1, max: 1000000 }).toInt(),
  body('preferredDate').custom(date),
  body('preferredTime').isIn(['morning', 'afternoon', 'late-afternoon']),
  body('message').optional({ values: 'falsy' }).isString().trim().isLength({ max: 2000 }),
];

const pilotValidation = [
  body('contactName').isString().trim().isLength({ min: 2, max: 120 }),
  body('companyName').isString().trim().isLength({ min: 2, max: 160 }),
  body('businessEmail').isEmail().normalizeEmail(),
  body('phone').custom(phone),
  body('industry').isString().trim().isLength({ min: 1, max: 120 }),
  body('companyLocation').isString().trim().isLength({ min: 2, max: 160 }),
  body('employeeCount').isInt({ min: 1, max: 1000000 }).toInt(),
  body('expectedParticipants').isInt({ min: 20, max: 50 }).toInt(),
  body('preferredStartDate').custom(date),
  body('requirements').isString().trim().isLength({ min: 2, max: 3000 }),
  body('consentToContact').isBoolean().toBoolean().equals('true'),
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, error: 'Invalid booking details', fields: errors.array().map(({ path, msg }) => ({ field: path, message: msg })) });
  next();
}

module.exports = { demoValidation, pilotValidation, handleValidationErrors };
