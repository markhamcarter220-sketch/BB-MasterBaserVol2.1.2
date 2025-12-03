
const request = require('supertest');
const express = require('express');
const mathRoutes = require('../../routes/math');

const app = express();
app.use(express.json());
app.use('/api/math', mathRoutes);

describe('Math API Routes', () => {
  test('POST /api/math/ev returns EV result', async () => {
    const res = await request(app)
      .post('/api/math/ev')
      .send({ odds: 150, stake: 100, probability: 0.4 });

    expect(res.statusCode).toBe(200);
    expect(res.body.ev).toBeCloseTo(10.00, 2);
  });

  test('POST /api/math/clv returns CLV result', async () => {
    const res = await request(app)
      .post('/api/math/clv')
      .send({ openOdds: -110, closeOdds: -125 });

    expect(res.statusCode).toBe(200);
    expect(typeof res.body.clv).toBe('number');
  });

  test('POST /api/math/devig returns devig result', async () => {
    const res = await request(app)
      .post('/api/math/devig')
      .send({ oddsArray: [-110, -110] });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.devig)).toBe(true);
  });
});
