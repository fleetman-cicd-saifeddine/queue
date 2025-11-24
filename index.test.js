const request = require('supertest');
const app = require('./index');

describe('Queue Service', () => {
  test('health endpoint returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('health endpoint returns JSON', async () => {
    const res = await request(app).get('/health');
    expect(res.type).toMatch(/json/);
  });
});
