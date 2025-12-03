// Helper functions for working with betting odds and expected value calculations.

/**
 * Convert American odds to decimal odds.
 * For example, +150 becomes 2.5 and -110 becomes 1.909...
 *
 * @param {number} odds - American odds value.
 * @returns {number} Decimal odds representation.
 */
export function americanToDecimal(odds) {
  const n = Number(odds);
  if (!Number.isFinite(n) || n === 0) return 0;
  if (n > 0) return 1 + n / 100;
  return 1 - 100 / n;
}

/**
 * Convert American odds to implied win probability (0–1).
 *
 * @param {number} odds - American odds value.
 * @returns {number|null} Implied probability, or null for invalid input.
 */
export function impliedProbability(odds) {
  const n = Number(odds);
  if (!Number.isFinite(n)) return null;
  if (n > 0) return 100 / (n + 100);
  return -n / (-n + 100);
}

/**
 * Convert decimal odds back to American odds. Returns 0 when the input
 * is invalid or less than or equal to 1 (no value gain).
 *
 * @param {number} dec - Decimal odds value.
 * @returns {number} American odds representation.
 */
export function decimalToAmerican(dec) {
  const d = Number(dec);
  if (!Number.isFinite(d) || d <= 1) return 0;
  // Positive American odds when decimal >= 2
  if (d >= 2) return Math.round((d - 1) * 100);
  // Negative American odds when decimal < 2
  return Math.round(-100 / (d - 1));
}