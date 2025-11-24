const request = require('supertest');
const app = require('./index');

test('health endpoint', async () => {
  const res = await request(app).get('/health');
  expect(res.status).toBe(200);
});
