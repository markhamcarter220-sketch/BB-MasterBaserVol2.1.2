const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const logFile = path.join(__dirname, '../logs/bet_logs.json');

router.get('/history', (_req, res) => {
  if (!fs.existsSync(logFile)) return res.json({ ok: true, results: [] });
  const data = fs.readFileSync(logFile, 'utf8');
  try {
    const logs = JSON.parse(data);
    res.json({ ok: true, results: logs.reverse() });  // Newest first
  } catch (e) {
    res.status(500).json({ error: 'Log file corrupted' });
  }
});

module.exports = router;
