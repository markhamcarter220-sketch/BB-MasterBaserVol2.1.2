const auth = require('../middleware/auth');
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const logFile = path.join(__dirname, '../logs/bet_logs.json');

router.post('/log-bet', (req, res) => {
  const bet = req.body;
  if (!bet || !bet.match || !bet.edge || !bet.book || !bet.stake || !bet.odds) return res.status(400).json({ error: 'Invalid bet object' });
  let logs = [];
  if (fs.existsSync(logFile)) {
    try {
      logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    } catch (e) {}
  }
  logs.push({ ...bet, time: new Date().toISOString() });
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
  res.json({ ok: true });
});

module.exports = router;


router.post('/delete', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const logFile = path.join(__dirname, '../../logs/bets.json');
  const betToDelete = req.body;

  fs.readFile(logFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Read error' });
    let logs = JSON.parse(data || '[]');
    logs = logs.filter(b => !(b.time === betToDelete.time && b.book === betToDelete.book));
    fs.writeFile(logFile, JSON.stringify(logs, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Write error' });
      res.json({ success: true });
    });
  });
});
