const express = require('express');
const router = express.Router();
const {
  logBet,
  getSessionSummary,
  getHistory,
} = require('../services/bankrollStore');

// POST /api/bankroll/log-bet - log a single bet into the bankroll session
router.post('/bankroll/log-bet', async (req, res) => {
  try {
    const payload = req.body || {};
    const bet = logBet(payload);
    const summary = getSessionSummary(payload.sessionId);
    return res.json({
      ok: true,
      bet,
      summary,
    });
  } catch (err) {
    console.error('[bankroll/log-bet] error', err);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

// GET /api/bankroll/session-summary - return session stats
router.get('/bankroll/session-summary', async (req, res) => {
  try {
    const { sessionId } = req.query;
    const summary = getSessionSummary(sessionId);
    return res.json({
      ok: true,
      summary,
    });
  } catch (err) {
    console.error('[bankroll/session-summary] error', err);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

// GET /api/bankroll/history - ordered bet history for a session
router.get('/bankroll/history', async (req, res) => {
  try {
    const { sessionId } = req.query;
    const history = getHistory(sessionId);
    return res.json({
      ok: true,
      history,
    });
  } catch (err) {
    console.error('[bankroll/history] error', err);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
