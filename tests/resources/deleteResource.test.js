const request = require('supertest');
const app = require('../../index');

describe('Delete Resource', () => {
  it('should delete an existing resource', async () => {
    const res = await request(app)
      .delete('/api/resources/<some-resource-id>');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Resource removed');
  });
});
