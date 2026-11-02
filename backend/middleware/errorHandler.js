function notFoundHandler(req, res) {
  res.status(404).json({ success: false, error: 'Route not found' });
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  if (error.name === 'ValidationError') {
    return res.status(400).json({ success: false, error: 'Validation failed', fields: Object.fromEntries(Object.entries(error.errors).map(([key, value]) => [key, value.message])) });
  }
  if (error.code === 11000) return res.status(409).json({ success: false, error: 'A booking with this reference already exists' });
  console.error(error);
  return res.status(error.statusCode || 500).json({ success: false, error: error.statusCode ? error.message : 'Internal server error' });
}

module.exports = { notFoundHandler, errorHandler };
