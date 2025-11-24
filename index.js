const express = require('express');

const app = express();
const PORT = process.env.PORT || 8161;

app.use(express.json());

app.use((err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  if (isDevelopment) {
    console.error('Error:', err.message);
  }
  res.status(500).json({
    error: 'Internal Server Error',
    message: isDevelopment ? err.message : 'An error occurred'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'queue'
  });
});

app.get('/api/status', (req, res) => {
  res.status(200).json({
    message: 'Queue Service',
    version: '1.0.0',
    status: 'running'
  });
});

app.listen(PORT, () => {
  console.log(`Queue service running on port ${PORT}`);
});

module.exports = app;
