const express = require('express');
const router = express.Router();

function americanToDecimal(odds) {
  if (!Number.isFinite(odds)) return null;
  if (odds > 0) return 1 + odds / 100;
  return 1 - 100 / odds;
}

function impliedFromAmerican(odds) {
  if (!Number.isFinite(odds)) return null;
  if (odds > 0) return 100 / (odds + 100);
  return -odds / (-odds + 100);
}

// POST /api/ev-chat/calculate
router.post('/ev-chat/calculate', async (req, res) => {
  try {
    const { odds, impliedProb, stake } = req.body || {};

    const americanOdds = Number(odds);
    const stakeNum = Number(stake) || 0;
    let prob = Number(impliedProb);
    if (!Number.isFinite(prob)) {
      prob = impliedFromAmerican(americanOdds);
    }

    let dec = americanToDecimal(americanOdds);
    if (!Number.isFinite(dec) || dec <= 1) {
      dec = null;
    }

    let ev = null;
    let breakEvenProb = null;
    let edgePct = null;

    if (dec && Number.isFinite(prob)) {
      const winProfit = stakeNum * (dec - 1);
      ev = prob * winProfit - (1 - prob) * stakeNum;
      breakEvenProb = 1 / dec;
      edgePct = (prob - breakEvenProb) * 100;
    }

    return res.json({
      ok: true,
      inputs: { odds: americanOdds, impliedProb: prob, stake: stakeNum },
      ev,
      breakEvenProb,
      edgePct,
      note: 'EV Chat endpoint uses simple American odds EV math.',
    });
  } catch (err) {
    console.error('[ev-chat/calculate] error', err);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
