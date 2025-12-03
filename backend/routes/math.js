
const express = require('express');
const router = express.Router();
const {
  calculateEV,
  clvA2,
  devigMultiplicative
} = require('../services/mathEngine');

// POST /api/math/ev
router.post('/ev', (req, res) => {
  const { odds, stake, probability } = req.body;
  if (odds === undefined || stake === undefined || probability === undefined) {
    return res.status(400).json({ error: 'Missing odds, stake, or probability' });
  }

  const ev = calculateEV(Number(odds), Number(stake), Number(probability));
  res.json({ ev });
});

// POST /api/math/clv
router.post('/clv', (req, res) => {
  const { openOdds, closeOdds } = req.body;
  if (openOdds === undefined || closeOdds === undefined) {
    return res.status(400).json({ error: 'Missing openOdds or closeOdds' });
  }

  const clv = clvA2(Number(openOdds), Number(closeOdds));
  res.json({ clv });
});

// POST /api/math/devig
router.post('/devig', (req, res) => {
  const { oddsArray } = req.body;
  if (!Array.isArray(oddsArray) || oddsArray.length === 0) {
    return res.status(400).json({ error: 'oddsArray must be a non-empty array' });
  }

  const devig = devigMultiplicative(oddsArray.map(Number));
  res.json({ devig });
});

module.exports = router;
