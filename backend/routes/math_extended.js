const express = require('express');
const router = express.Router();
const {
  clvA2,
  devigMultiplicative,
  arb3way,
} = require('../utils/evMath');

function requireFields(obj, fields) {
  if (!obj || typeof obj !== 'object') return false;
  return fields.every((f) => Object.prototype.hasOwnProperty.call(obj, f));
}

// POST /math/clv – Compute closing line value (CLV) in percentage points.
router.post('/math/clv', (req, res) => {
  if (!requireFields(req.body, ['openOdds', 'closeOdds'])) {
    return res.status(400).json({ error: 'invalid_payload' });
  }
  const { openOdds, closeOdds } = req.body;
  const value = clvA2(openOdds, closeOdds);
  if (value == null) {
    return res.status(400).json({ error: 'invalid_odds' });
  }
  return res.json({ ok: true, clv: value });
});

// POST /math/devig – Remove vig from implied probabilities.
router.post('/math/devig', (req, res) => {
  if (!requireFields(req.body, ['probs'])) {
    return res.status(400).json({ error: 'invalid_payload' });
  }
  const { probs } = req.body;
  const result = devigMultiplicative(probs);
  if (!Array.isArray(result) || result.length === 0) {
    return res.status(400).json({ error: 'invalid_probs' });
  }
  return res.json({ ok: true, fair: result });
});

// POST /math/arb – Determine if three outcomes form an arbitrage opportunity.
router.post('/math/arb', (req, res) => {
  if (!requireFields(req.body, ['p1', 'p2', 'p3'])) {
    return res.status(400).json({ error: 'invalid_payload' });
  }
  const { p1, p2, p3 } = req.body;
  const exists = arb3way(p1, p2, p3);
  return res.json({ ok: true, arb: exists });
});

module.exports = router;
