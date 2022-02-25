const app = require('../src/app');
const mongoose = require('mongoose');
const request = require('supertest');
// const { expectCt } = require('helmet');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Placeholder test suite', () => {
  test('1 should be equal to 1', async () => {
    /*
    const response = await request(app).get('/home/');
    expect(response.body.message).toEqual('Successfully returned home text');
    expect(response.body.result).toEqual(
      "You've connected the database! Isn't it so beautiful???",
    );
    expect(response.statusCode).toBe(200);*/
    expect(1).toBe(1);
  });
});
