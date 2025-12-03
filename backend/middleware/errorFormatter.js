
const logger = require('../utils/logger');

module.exports = function (err, req, res, next) {
  // Standardised error handler: log the error and send a JSON response.
  logger.error('Server error', err);
  res.status(err.status || 500).json({
    ok: false,
    error: err.message || 'internal_error',
    code: err.code || 'ERR_GENERIC',
  });
};