const { logBet, getSessionSummary, getHistory, _getSession } = require('../services/bankrollStore');

describe('bankrollStore service', () => {
  test('logs bets and updates bankroll', () => {
    const before = getSessionSummary('jest-session');
    expect(before.bankroll).toBeDefined();

    logBet({ sessionId: 'jest-session', stake: 100, odds: -110, result: 'win' });
    const after = getSessionSummary('jest-session');

    expect(after.bankroll).toBeGreaterThan(before.bankroll);
    expect(after.betsPlaced).toBeGreaterThan(before.betsPlaced);
  });

  test('history returns recent bets', () => {
    logBet({ sessionId: 'jest-session', stake: 50, odds: 150, result: 'loss' });
    const history = getHistory('jest-session');
    expect(Array.isArray(history.bets)).toBe(true);
    expect(history.bets.length).toBeGreaterThan(0);
  });
});
