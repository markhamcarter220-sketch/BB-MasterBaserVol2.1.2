// Client-side implementation of the EV transformer. This mirrors the backend
// logic found in backend/services/transformOddsToEV.js, but does not rely on
// any Node.js modules. It calculates implied probability, fair odds and
// bettor edge for each odds entry.

/**
 * Convert American odds to implied win probability (0–1).
 * @param {number} price - American odds.
 * @returns {number|null}
 */
function calculateImpliedProbability(price) {
  const n = Number(price);
  if (!Number.isFinite(n)) return null;
  if (n > 0) return 100 / (n + 100);
  return -n / (-n + 100);
}

/**
 * Given a probability (0–1), return the fair American odds.
 * Returns null when prob is invalid or outside (0,1).
 * @param {number} prob
 * @returns {number|null}
 */
function calculateFairOdds(prob) {
  const p = Number(prob);
  if (!Number.isFinite(p) || p <= 0 || p >= 1) return null;
  const dec = 1 / p;
  if (dec >= 2) return Math.round((dec - 1) * 100);
  return Math.round(-100 / (dec - 1));
}

/**
 * Compute the edge between fair odds and market odds as a percentage.
 * Positive values indicate bettor edge.
 * @param {number} fair
 * @param {number} market
 * @returns {number|null}
 */
function calculateEdge(fair, market) {
  const f = Number(fair);
  const m = Number(market);
  if (!Number.isFinite(f) || !Number.isFinite(m) || m === 0) return null;
  return ((f - m) / Math.abs(m)) * 100;
}

/**
 * Transform an array of odds objects into an array enriched with EV metrics.
 * Each element in the input array should at minimum contain a `price` field
 * representing American odds. Other fields are preserved.
 *
 * @param {Array<Object>} odds - Array of raw odds objects.
 * @returns {Array<Object>} Array with impliedProbability, fairOdds, edge and evDollar fields.
 */
export default function transformOddsToEV(odds) {
  if (!Array.isArray(odds)) return [];
  return odds.map((o) => {
    const implied = calculateImpliedProbability(o.price);
    const fair = calculateFairOdds(implied);
    const edge = calculateEdge(fair, o.price);
    return {
      ...o,
      impliedProbability: implied ?? 0,
      fairOdds: fair ?? null,
      edge: edge ?? 0,
      evDollar: edge ? edge / 100 : 0,
    };
  });
}