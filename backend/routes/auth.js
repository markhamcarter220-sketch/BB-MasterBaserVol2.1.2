const express = require('express');
const router = express.Router();

router.get('/check', (req, res) => {
  const token = req.headers.authorization;
  if (!token || token !== 'mock-token') {
    return res.status(403).json({ error: 'Not authorized' });
  }
  res.json({ ok: true });
});

module.exports = router;
