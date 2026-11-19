const request = require('supertest');
const { createApp } = require('../src/app');

describe('cloudpulse api', () => {
  const app = createApp();

  test('health endpoint returns ok', async () => {
    const res = await request(app).get('/healthz');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('creates and lists an item', async () => {
    const created = await request(app).post('/api/items').send({ name: 'first' });
    expect(created.status).toBe(201);
    const list = await request(app).get('/api/items');
    expect(list.body).toHaveLength(1);
  });

  test('rejects an item without a name', async () => {
    const res = await request(app).post('/api/items').send({});
    expect(res.status).toBe(400);
  });

  test('exposes request duration metrics', async () => {
    await request(app).get('/healthz');
    const res = await request(app).get('/metrics');
    expect(res.status).toBe(200);
    expect(res.text).toContain('http_request_duration_seconds');
  });
});
