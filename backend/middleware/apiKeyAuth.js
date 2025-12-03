const User = require('../models/User');

module.exports = async function apiKeyAuth(req, res, next) {
  const userId = req.header('x-user-id');
  const apiKey = req.header('x-api-key');

  if (!userId || !apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const user = await User.findOne({ uid: userId });
  if (!user) return res.status(401).json({ error: 'User not found' });

  req.user = user;
  next();
};
