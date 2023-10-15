const request = require('supertest');
const app = require('../../index');

describe('Add Resource', () => {
  it('should add a new resource', async () => {
    const res = await request(app)
      .post('/api/resources')
      .send({
        name: "Test Resource",
        link: "http://test.com",
        category: "<some-category-id>",
        user: "<mocked-user-id>"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'Test Resource');
  });
});
