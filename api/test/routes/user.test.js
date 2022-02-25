const _ = require('lodash');
let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  POST_SIMPLE_USER,
  POST_SIMPLE_USER_EXPECTED,
  POST_WRONG_USER_ADMIN,
  POST_WRONG_USER_NO_AUTH_ID,
  POST_WRONG_USER_ADDITIONAL_FIELDS,
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

  test('simple test', async () => {
    expect(1).toEqual(1);
  });

  test('API should create user', async () => {
    const body = POST_SIMPLE_USER;
    const response = await request(app).post('/user/').send(body);

    const message = response.body.message;
    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(message).toEqual('Successfully created a new user');
    expect(result).toEqual(POST_SIMPLE_USER_EXPECTED);
  });

  test('HTTP response status code', async () => {
    const body = POST_SIMPLE_USER;
    const response = await request(app).post('/user/').send(body);

    expect(response.status).toBe(200);
  });

  test('User Role is always 0', async () => {
    const body = POST_WRONG_USER_ADMIN;
    const response = await request(app).post('/user/').send(body);

    const message = response.body.message;
    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(message).toEqual('Successfully created a new user');
    expect(result).toEqual(POST_SIMPLE_USER_EXPECTED);
  });

  test('No auth id results in error', async () => {
    const body = POST_WRONG_USER_NO_AUTH_ID;
    const response = await request(app).post('/user/').send(body);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test('No role still creates a new user', async () => {
    const body = POST_WRONG_USER_NO_ROLE;
    const response = await request(app).post('/user/').send(body);

    const message = response.body.message;
    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(message).toEqual('Successfully created a new user');
    expect(result).toEqual(POST_SIMPLE_USER_EXPECTED);
  });

  test('Additional fields still create a new user', async () => {
    const body = POST_WRONG_USER_ADDITIONAL_FIELDS;
    const response = await request(app).post('/user/').send(body);

    const message = response.body.message;
    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(message).toEqual('Successfully created a new user');
    expect(result).toEqual(POST_SIMPLE_USER_EXPECTED);
  });
});
