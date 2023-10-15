const request = require('supertest');
const app = require('../../index');

describe('Edit Resource', () => {
  it('should edit an existing resource', async () => {
    const res = await request(app)
      .put('/api/resources/<some-resource-id>')
      .send({
        name: "Updated Resource Name",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Updated Resource Name');
  });
});
