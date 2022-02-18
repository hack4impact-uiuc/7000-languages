/*const app = require('../src/app');
const mongoose = require('mongoose');
const request = require('supertest');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /home/ ', () => {
  test('API should return home text', async () => {
    const response = await request(app).get('/home/');
    expect(response.body.message).toEqual('Successfully returned home text');
    expect(response.body.result).toEqual(
      "You've connected the database! Isn't it so beautiful???",
    );
    expect(response.statusCode).toBe(200);
  });
});
*/