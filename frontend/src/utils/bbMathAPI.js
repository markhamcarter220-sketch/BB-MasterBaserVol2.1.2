// Client-side helpers to call the math endpoints on the backend.

/**
 * Calculate the closing line value (CLV) given opening and closing odds.
 *
 * @param {number} openOdds - Opening American odds.
 * @param {number} closeOdds - Closing American odds.
 * @returns {Promise<Object>} JSON response from the server.
 */
export async function calcCLV(openOdds, closeOdds) {
  const response = await fetch('/api/math/clv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ openOdds, closeOdds }),
  });
  return response.json();
}

/**
 * Remove vigorish (the bookmaker’s margin) from a set of probabilities.
 *
 * @param {Array<number>} probs - Raw probabilities to devig.
 * @returns {Promise<Object>} JSON response from the server.
 */
export async function calcDevig(probs) {
  const response = await fetch('/api/math/devig', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ probs }),
  });
  return response.json();
}

/**
 * Detect a three-way arbitrage opportunity based on decimal odds.
 *
 * @param {number} p1 - Decimal odds for outcome 1.
 * @param {number} p2 - Decimal odds for outcome 2.
 * @param {number} p3 - Decimal odds for outcome 3.
 * @returns {Promise<Object>} JSON response from the server.
 */
export async function calcArb(p1, p2, p3) {
  const response = await fetch('/api/math/arb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ p1, p2, p3 }),
  });
  return response.json();
}