const express = require('express');
const router = express.Router();
const { config } = require('../config');

// GET /api/odds/fetch
// Lightweight odds wrapper – returns the raw games list from The Odds API
// using the same sport/markets/regions/oddsFormat defaults as /api/odds.
router.get('/odds/fetch', async (req, res) => {
  try {
    const {
      sport,
      markets = 'h2h,spreads,totals',
      regions = 'us',
      oddsFormat = 'american',
    } = req.query;

    if (!sport) {
      return res.status(400).json({ ok: false, error: 'missing_sport' });
    }

    const apiKey = config.oddsApiKey;
    if (!apiKey) {
      return res.status(500).json({
        ok: false,
        error: 'missing_odds_api_key',
      });
    }

    const url = new URL(`https://api.the-odds-api.com/v4/sports/${sport}/odds`);
    url.searchParams.set('apiKey', apiKey);
    url.searchParams.set('markets', markets);
    url.searchParams.set('regions', regions);
    url.searchParams.set('oddsFormat', oddsFormat);

    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      console.error('[odds/fetch] upstream error', response.status, text);
      return res.status(502).json({ ok: false, error: 'upstream_error' });
    }

    const games = await response.json();
    return res.json({
      ok: true,
      sport,
      markets,
      regions,
      oddsFormat,
      games,
    });
  } catch (err) {
    console.error('[odds/fetch] error', err);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

module.exports = router;
