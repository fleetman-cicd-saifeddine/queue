const request = require('supertest');
const app = require('./index');

describe('Queue Service API', () => {
  describe('GET /health', () => {
    test('should return 200 with health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('service', 'queue');
      expect(response.body).toHaveProperty('timestamp');
    });

    test('should return valid timestamp', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      const timestamp = new Date(response.body.timestamp);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).toBeGreaterThan(0);
    });
  });

  describe('GET /api/status', () => {
    test('should return 200 with status', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Queue Service');
      expect(response.body).toHaveProperty('version', '1.0.0');
      expect(response.body).toHaveProperty('status', 'running');
      expect(response.body).toHaveProperty('uptime');
    });

    test('should return positive uptime', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      expect(response.body.uptime).toBeGreaterThan(0);
    });
  });

  describe('404 Handler', () => {
    test('should return 404 for unknown route', async () => {
      const response = await request(app)
        .get('/unknown/route')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Not Found');
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('/unknown/route');
    });
  });

  describe('Content-Type', () => {
    test('should return JSON content type', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
    });
  });
});
