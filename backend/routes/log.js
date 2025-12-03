const express = require('express');
const router = express.Router();
const Bet = require('../models/Bet');

// POST: log a bet
router.post('/', async (req, res) => {
  const { stake, odds, note } = req.body;
  const userId = req.user.id;
  if (!stake || !userId) return res.status(400).json({ error: 'Missing data' });

  const bet = new Bet({ userId, stake, odds, note });
  await bet.save();
  res.json({ success: true });
});

// GET: fetch recent bets for user
router.get('/', async (req, res) => {
  const userId = req.user.id;
  const bets = await Bet.find({ userId }).sort({ createdAt: -1 }).limit(5);
  res.json(bets);
});


// GET /export - Return all user logs as CSV
router.get('/export', async (req, res) => {
  try {
    const userId = req.user.uid;
    const logs = await Bet.find({ userId });

    const fields = ['timestamp', 'book', 'stake', 'odds', 'edge', 'sport'];
    const csvRows = [fields.join(',')];

    logs.forEach(log => {
      const row = fields.map(field => JSON.stringify(log[field] || '')).join(',');
      csvRows.push(row);
    });

    const csvContent = csvRows.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=bets.csv');
    res.send(csvContent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export logs as CSV' });
  }
});


module.exports = router;
