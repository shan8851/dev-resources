const request = require('supertest');
const app = require('../../index');

describe('Get All Resources', () => {
  it('should fetch all resources', async () => {
    const res = await request(app).get('/api/resources');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('resources');
  });
});
