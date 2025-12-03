const express = require('express');
const router = express.Router();
const Bet = require('../models/Bet');

router.get('/', async (req, res) => {
  try {
    const userId = req.user.uid;
    const bets = await Bet.find({ userId });

    const totalStake = bets.reduce((acc, b) => acc + (b.stake || 0), 0);
    const totalBets = bets.length;
    const totalProfit = bets.reduce((acc, b) => acc + (b.outcome || 0), 0);
    const roi = totalStake > 0 ? (totalProfit / totalStake) * 100 : 0;

    res.json({ totalBets, totalStake, totalProfit, roi: roi.toFixed(2) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to calculate analytics' });
  }
});

module.exports = router;
