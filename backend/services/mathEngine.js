
const { clvA2 } = require('./clvService');
const { devigMultiplicative } = require('./devigService');
const { arb3way } = require('./arbService');
const cache = require('./cache');

// Calculate Expected Value (EV)
function calculateEV(odds, stake, probability) {
  if (!odds || !stake || !probability) return null;

  const payout = odds > 0
    ? stake * (odds / 100)
    : stake / (Math.abs(odds) / 100);

  const expectedProfit = (probability * payout) - ((1 - probability) * stake);
  return Number(expectedProfit.toFixed(2));
}

// Cached CLV calculation
function cachedCLV(openOdds, closeOdds) {
  const key = `clv_${openOdds}_${closeOdds}`;
  const cached = cache.get(key, 30000);
  if (cached) return cached;

  const value = clvA2(openOdds, closeOdds);
  cache.set(key, value);
  return value;
}

module.exports = {
  clvA2,
  devigMultiplicative,
  arb3way,
  calculateEV,
  cachedCLV
};
