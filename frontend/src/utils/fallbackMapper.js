// Utilities for mapping fallback sportsbook API data into simplified structures.

/**
 * Convert odds data into an array of simple objects containing the bookmaker and outcomes.
 * Returns null when no odds array is provided.
 *
 * @param {Object} data - The source data containing an odds array.
 * @returns {Array|null} Mapped odds or null if unavailable.
 */
export function mapFallbackOdds(data) {
  if (!data || !Array.isArray(data.odds)) return null;
  return data.odds.map((o) => ({
    book: o.bookmaker,
    outcomes: o.markets?.[0]?.outcomes || [],
  }));
}

/**
 * Simplify a spreads object returned from an API into a more convenient format.
 *
 * @param {Object} sp - The spreads object to map.
 * @returns {Object} A simplified spreads object.
 */
export function mapFallbackSpreads(sp) {
  if (!sp) return {};
  return {
    line: sp.line,
    home: sp.home,
    away: sp.away,
  };
}

/**
 * Simplify a totals object returned from an API into a more convenient format.
 *
 * @param {Object} t - The totals object to map.
 * @returns {Object} A simplified totals object.
 */
export function mapFallbackTotals(t) {
  if (!t) return {};
  return {
    total: t.total,
    over: t.over,
    under: t.under,
  };
}