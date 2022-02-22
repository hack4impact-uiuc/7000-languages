const _ = require('lodash');
let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  POST_SIMPLE_USER,
  POST_SIMPLE_USER_EXPECTED,
} = require('../mock-data/user-mock-data');

// This block tests the POST /user/ endpoint.
describe('POST /user/ ', () => {
  /* 
    We have to make sure we connect to a MongoDB mock db before the test 
    and close the connection at the end.
  */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('API should create user', async () => {
    const body = POST_SIMPLE_USER;
    const response = await request(app).post('/user/').send(body);

    const message = response.body.message;
    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(message).toEqual('Successfully created a new user');
    expect(result).toEqual(POST_SIMPLE_USER_EXPECTED);
  });
});
