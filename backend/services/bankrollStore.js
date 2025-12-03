// Simple in‑memory bankroll "DB".
// This is structured as a service so it can later be swapped for a real
// database implementation (Mongo, Postgres, etc.) without changing routes.

const sessions = new Map();

function getSession(sessionId) {
  const id = sessionId || 'default';
  if (!sessions.has(id)) {
    sessions.set(id, {
      id,
      startingBankroll: 1000,
      bankroll: 1000,
      bets: [],
    });
  }
  return sessions.get(id);
}

/**
 * Log a bet and update the bankroll.
 * payload: { sessionId, stake, odds, result } where result is 'win' | 'loss' | 'push'
 */
function logBet(payload = {}) {
  const { sessionId, stake, odds, result } = payload;
  const session = getSession(sessionId);
  const numericStake = Number(stake) || 0;
  const numericOdds = Number(odds);
  const outcome = result || 'pending';

  let profit = 0;
  if (outcome === 'win') {
    if (Number.isFinite(numericOdds)) {
      if (numericOdds > 0) {
        profit = (numericStake * numericOdds) / 100;
      } else {
        profit = (numericStake * 100) / Math.abs(numericOdds);
      }
    }
  } else if (outcome === 'loss') {
    profit = -numericStake;
  } else if (outcome === 'push') {
    profit = 0;
  }

  const after = session.bankroll + profit;

  const betRecord = {
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    ts: new Date().toISOString(),
    stake: numericStake,
    odds: numericOdds,
    result: outcome,
    profit,
    bankrollBefore: session.bankroll,
    bankrollAfter: after,
  };

  session.bankroll = after;
  session.bets.push(betRecord);
  return betRecord;
}

function getSessionSummary(sessionId) {
  const session = getSession(sessionId);
  const profitLoss = session.bankroll - session.startingBankroll;
  return {
    sessionId: session.id,
    startingBankroll: session.startingBankroll,
    bankroll: session.bankroll,
    profitLoss,
    betsPlaced: session.bets.length,
  };
}

function getHistory(sessionId) {
  const session = getSession(sessionId);
  return {
    sessionId: session.id,
    bets: session.bets.slice().reverse(),
  };
}

module.exports = {
  logBet,
  getSessionSummary,
  getHistory,
  _getSession: getSession, // exported for tests
};
