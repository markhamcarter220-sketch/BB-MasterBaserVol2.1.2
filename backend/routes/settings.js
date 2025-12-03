const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/settings', (req, res) => {
  const { username, theme, unitSize } = req.body;
  db.run(
    `UPDATE users SET theme = ?, unitSize = ? WHERE username = ?`,
    [theme, unitSize, username],
    function (err) {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ success: true });
    }
  );
});

module.exports = router;
