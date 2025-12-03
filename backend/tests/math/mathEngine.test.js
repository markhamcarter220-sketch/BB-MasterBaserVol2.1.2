
const {
  calculateEV,
  clvA2,
  devigMultiplicative
} = require('../../services/mathEngine');

describe('Math Engine Functions', () => {
  test('calculateEV returns correct EV for +odds', () => {
    const result = calculateEV(150, 100, 0.4); // EV = (0.4 * 150) - (0.6 * 100)
    expect(result).toBeCloseTo(10.00, 2);
  });

  test('calculateEV returns correct EV for -odds', () => {
    const result = calculateEV(-110, 100, 0.55);
    expect(result).toBeCloseTo(9.09, 2);
  });

  test('clvA2 calculates positive CLV', () => {
    const clv = clvA2(-110, -120);
    expect(typeof clv).toBe('number');
    expect(clv).toBeGreaterThan(1.0);
  });

  test('devigMultiplicative returns array of implied probabilities', () => {
    const result = devigMultiplicative([-110, -110]);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0]).toBeGreaterThan(0);
  });
});
