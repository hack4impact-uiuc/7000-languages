const _ = require('lodash');
let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  POST_SIMPLE_USER,
  POST_SIMPLE_USER_EXPECTED,
  POST_USER_ADMIN,
  POST_WRONG_USER_NO_ID_TOKEN,
  POST_USER_ADDITIONAL_FIELDS,
  POST_USER_ONE_LESS_FIELD,
  POST_WRONG_USER_NO_ROLE,
  EXPECTED_GET_USER_DATA,
} = require('../mock-data/user-mock-data');
const { withAuthentication } = require('../utils/auth');
const {
  SUCCESS_GETTING_USER_DATA,
  ERR_IMPROPER_ID_TOKEN,
} = require('../../src/utils/constants');

/* 
  Google Auth Mocker - uses jest to mock the Google Auth library.
  Include the code below whenever you are testing an endpoint that uses the authentication middleware.

  Sources: 
  https://stackoverflow.com/questions/53740341/unit-testing-a-js-script-with-jest-can-i-mock-an-es6-class
  https://jestjs.io/docs/mock-function-api#mockfnmockimplementationfn
  https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c
*/
jest.mock('google-auth-library');
const { OAuth2Client } = require('google-auth-library');
const { verifyIdTokenMockReturnValue } = require('../mock-data/auth-mock-data');

const verifyIdTokenMock = OAuth2Client.prototype.verifyIdToken;
verifyIdTokenMock.mockImplementation(verifyIdTokenMockReturnValue);

// This block tests the GET /user/ endpoint.
describe('GET /user/ ', () => {
  /* 
    We have to make sure we connect to a MongoDB mock db before the test 
    and close the connection at the end.
  */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('API should fetch user data', async () => {
    const response = await withAuthentication(request(app).get('/user/'));

    const message = response.body.message;
    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_GETTING_USER_DATA);
    expect(result).toEqual(EXPECTED_GET_USER_DATA);
  });

  test('API should fail to fetch user data due to invalid user token', async () => {
    const response = await withAuthentication(
      request(app).get('/user/'),
      'invalid id token',
    );

    const message = response.body.message;
    expect(response.status).toBe(401);
    expect(message).toEqual(ERR_IMPROPER_ID_TOKEN);
  });
});

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

    const response = await withAuthentication(
      request(app).post('/user/').send(body),
    );
    const message = response.body.message;
    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(message).toEqual('Successfully created a new user');
    expect(result).toEqual(POST_SIMPLE_USER_EXPECTED);
  });

  test('HTTP response status code', async () => {
    const body = POST_SIMPLE_USER;
    const response = await withAuthentication(
      request(app).post('/user/').send(body),
    );
    expect(response.status).toBe(200);
  });

  test('User Role is always 0', async () => {
    const body = POST_USER_ADMIN;
    const response = await withAuthentication(
      request(app).post('/user/').send(body),
    );

    const message = response.body.message;
    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(message).toEqual('Successfully created a new user');
    expect(result).toEqual(POST_SIMPLE_USER_EXPECTED);
  });

  test('No id token results in error', async () => {
    const body = POST_WRONG_USER_NO_ID_TOKEN;
    const response = await withAuthentication(
      request(app).post('/user/').send(body),
    );

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test('No role still creates a new user', async () => {
    const body = POST_WRONG_USER_NO_ROLE;
    const response = await withAuthentication(
      request(app).post('/user/').send(body),
    );

    const message = response.body.message;
    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(message).toEqual('Successfully created a new user');
    expect(result).toEqual(POST_SIMPLE_USER_EXPECTED);
  });

  test('Additional fields still create a new user', async () => {
    const body = POST_USER_ADDITIONAL_FIELDS;
    const response = await withAuthentication(
      request(app).post('/user/').send(body),
    );

    const message = response.body.message;
    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(message).toEqual('Successfully created a new user');
    expect(result).toEqual(POST_SIMPLE_USER_EXPECTED);
  });

  test('One less field still create a new user', async () => {
    const body = POST_USER_ONE_LESS_FIELD;
    const response = await withAuthentication(
      request(app).post('/user/').send(body),
    );

    const message = response.body.message;
    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(message).toEqual('Successfully created a new user');
    expect(result).toEqual(POST_SIMPLE_USER_EXPECTED);
  });

  test('Duplicate authIDs cannot exist', async () => {
    const body_1 = POST_SIMPLE_USER;
    const response_1 = await request(app).post('/user/').send(body_1);

    const message = response_1.body.message;
    const result = _.omit(response_1.body.result, ['_id', '__v']);

    expect(message).toEqual('Successfully created a new user');
    expect(result).toEqual(POST_SIMPLE_USER_EXPECTED);

    const body_2 = POST_SIMPLE_USER;
    const response_2 = await request(app).post('/user/').send(body_2);

    expect(response_2.status).toEqual(202);
  });
});
