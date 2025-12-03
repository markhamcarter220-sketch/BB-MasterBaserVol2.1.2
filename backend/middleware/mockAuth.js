module.exports = (req, res, next) => {
  // In real world, parse token from headers
  req.user = { id: req.headers['x-user-id'] || 'demo_user' };
  next();
};
