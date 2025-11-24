const express = require('express');

const app = express();
const PORT = process.env.PORT || 8161;

app.use(express.json());

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'queue',
    timestamp: new Date().toISOString()
  });
});

/**
 * Service status endpoint
 */
app.get('/api/status', (req, res) => {
  res.status(200).json({
    message: 'Queue Service',
    version: '1.0.0',
    status: 'running',
    uptime: process.uptime()
  });
});

/**
 * Error handling middleware
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message
  });
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.path} not found`
  });
});

const server = app.listen(PORT, () => {
  console.log(`Queue service running on port ${PORT}`);
});

module.exports = app;
module.exports.server = server;