const request = require('supertest');
const app = require('./index');

describe('Queue Service - Comprehensive Tests', () => {
  
  describe('Health Endpoints', () => {
    test('GET /health should return 200 with healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('service', 'queue');
      expect(response.body).toHaveProperty('timestamp');
    });

    test('GET /api/status should return 200 with service info', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Queue Service');
      expect(response.body).toHaveProperty('version', '1.0.0');
      expect(response.body).toHaveProperty('status', 'running');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('Error Handling', () => {
    test('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Not Found');
    });

    test('should return JSON error response', async () => {
      const response = await request(app)
        .get('/invalid/path')
        .expect(404);

      expect(response.type).toMatch(/json/);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Response Headers', () => {
    test('should return JSON content type for health endpoint', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
    });

    test('should return JSON content type for status endpoint', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
    });
  });

  describe('Timestamp Validation', () => {
    test('health endpoint should return valid ISO timestamp', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      const timestamp = response.body.timestamp;
      const date = new Date(timestamp);
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBeGreaterThan(0);
    });

    test('uptime should be a positive number', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      expect(typeof response.body.uptime).toBe('number');
      expect(response.body.uptime).toBeGreaterThan(0);
    });
  });

  describe('Service Information', () => {
    test('should return correct service name', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      expect(response.body.message).toBe('Queue Service');
    });

    test('should return correct version', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      expect(response.body.version).toMatch(/^\d+\.\d+\.\d+$/);
    });

    test('should indicate service is running', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      expect(response.body.status).toBe('running');
    });
  });
});
