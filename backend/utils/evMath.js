// A collection of helper functions for expected value calculations and pricing conversions.

/**
 * Convert American odds to implied win probability (0–1).
 * e.g. -110 -> ~0.524, +150 -> 0.4
 */
function calculateImpliedProbability(price) {
  const n = Number(price);
  if (!Number.isFinite(n)) return null;
  if (n > 0) {
    return 100 / (n + 100);
  }
  return -n / (-n + 100);
}

/**
 * Given a probability (0–1), return the fair American odds.
 * Returns null when prob is invalid or zero.
 */
function calculateFairOdds(prob) {
  const p = Number(prob);
  if (!Number.isFinite(p) || p <= 0 || p >= 1) return null;
  // Convert fair decimal odds to American style for consistency with rest of app.
  const dec = 1 / p;
  if (dec >= 2) {
    return Math.round((dec - 1) * 100); // positive American odds
  }
  return Math.round(-100 / (dec - 1)); // negative American odds
}

/**
 * Edge between fair odds and market odds expressed as a percentage.
 * Positive = bettor edge, negative = book edge.
 */
function calculateEdge(fair, market) {
  const f = Number(fair);
  const m = Number(market);
  if (!Number.isFinite(f) || !Number.isFinite(m) || m === 0) return null;
  return ((f - m) / Math.abs(m)) * 100;
}

/**
 * CLV: change in implied probability (in percentage points) from open to close.
 */
function clvA2(openOdds, closeOdds) {
  const pOpen = calculateImpliedProbability(openOdds);
  const pClose = calculateImpliedProbability(closeOdds);
  if (pOpen == null || pClose == null) return null;
  return (pClose - pOpen) * 100;
}

/**
 * Devig probabilities by simple normalization.
 * Input: array of unnormalized probabilities.
 * Output: new array summing to 1, or [] if invalid.
 */
function devigMultiplicative(probs) {
  if (!Array.isArray(probs) || probs.length === 0) return [];
  const nums = probs.map((p) => Number(p)).filter((p) => Number.isFinite(p) && p >= 0);
  if (nums.length === 0) return [];
  const sum = nums.reduce((a, b) => a + b, 0);
  if (!Number.isFinite(sum) || sum === 0) return [];
  return nums.map((p) => p / sum);
}

/**
 * Basic 3‑way arbitrage detector using decimal odds.
 * Returns true if 1/p1 + 1/p2 + 1/p3 < 1.
 */
function arb3way(p1, p2, p3) {
  const d1 = Number(p1);
  const d2 = Number(p2);
  const d3 = Number(p3);
  if (![d1, d2, d3].every((v) => Number.isFinite(v) && v > 1)) return false;
  const inv = 1 / d1 + 1 / d2 + 1 / d3;
  return inv < 1;
}

module.exports = {
  calculateImpliedProbability,
  calculateFairOdds,
  calculateEdge,
  clvA2,
  devigMultiplicative,
  arb3way,
};
