let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  POST_SIMPLE_USER
} = require('../mock-data/user-mock-data');

describe('POST /user/ ', () => {
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  beforeEach(() => {
    app = require('../../src/app');
  });

  test('API should return newly created user', async () => {
    const body = POST_SIMPLE_USER
    const response = await request(app).post('/user/').send(body);
    console.error(response);
    expect(response.body.message).toEqual('Successfully created a new user');
    console.log(response.body.result);
    // expect(response.body.result).toEqual(
    //   "You've connected the database! Isn't it so beautiful???",
    // );
    expect(response.statusCode).toBe(200);
  });
});
