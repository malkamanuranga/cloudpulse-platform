const express = require('express');
const client = require('prom-client');

function createApp(options = {}) {
  const app = express();
  app.use(express.json());

  const registry = new client.Registry();
  if (options.defaultMetrics) {
    client.collectDefaultMetrics({ register: registry });
  }

  const duration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1],
    registers: [registry],
  });

  app.use((req, res, next) => {
    const end = duration.startTimer();
    res.on('finish', () => {
      const route = req.route ? req.route.path : req.path;
      end({ method: req.method, route, status: res.statusCode });
    });
    next();
  });

  const items = [];

  app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

  app.get('/api/items', (req, res) => res.json(items));

  app.post('/api/items', (req, res) => {
    const { name } = req.body || {};
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'name is required' });
    }
    const item = { id: items.length + 1, name };
    items.push(item);
    return res.status(201).json(item);
  });

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', registry.contentType);
    res.send(await registry.metrics());
  });

  return app;
}

module.exports = { createApp };
