const express = require('express');

const app = express();
const PORT = process.env.PORT || 8161;

app.use(express.json());

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
