const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
require('dotenv').config();

describe('Log API Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /api/log should 403 without headers', async () => {
    const res = await request(app).get('/api/log');
    expect(res.statusCode).toBe(403);
  });

  test('POST /api/log should fail with missing data', async () => {
    const res = await request(app)
      .post('/api/log')
      .set('x-api-key', process.env.API_KEY)
      .set('x-user-id', 'mockuid')
      .send({});
    expect(res.statusCode).toBe(400);
  });
});
