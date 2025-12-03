const express = require('express');
const router = express.Router();

function calculateEdge(odds, fairOdds) {
  return Math.round((100 * ((odds - fairOdds) / fairOdds)) * 10) / 10;
}

router.get("/ev-scan/run", (_req, res) => {
  const modelFairLines = {
    "NYG vs PHI": 110,
    "MIA vs BUF": -105,
    "LAL vs BOS": 120,
  };

  const books = {
    DK: { "NYG vs PHI": 125, "MIA vs BUF": -102, "LAL vs BOS": 135 },
    FD: { "NYG vs PHI": 120, "MIA vs BUF": -108, "LAL vs BOS": 130 },
    MGM: { "NYG vs PHI": 130, "MIA vs BUF": -100, "LAL vs BOS": 128 },
  };

  const results = [];
  for (let book in books) {
    for (let match in books[book]) {
      const odds = books[book][match];
      const fair = modelFairLines[match];
      let decimalOdds = odds > 0 ? (odds / 100) + 1 : (100 / Math.abs(odds)) + 1;
      let fairDecimal = fair > 0 ? (fair / 100) + 1 : (100 / Math.abs(fair)) + 1;
      const edge = calculateEdge(decimalOdds, fairDecimal);
      if (edge > 1.5) {
        results.push({ match, edge, book });
      }
    }
  }

  res.json({ ok: true, results });
});

module.exports = router;
