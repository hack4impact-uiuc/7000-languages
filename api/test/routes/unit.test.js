let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const { GET_SIMPLE_UNIT_EXPECTED } = require('../mock-data/unit-mock-data');
const { withAuthentication } = require('../utils/auth');
const omitDeep = require('omit-deep-lodash');
const _ = require('lodash');

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

describe('GET /language/unit/ ', () => {
  /* 
    We have to make sure we connect to a MongoDB mock db before the test 
    and close the connection at the end.
  */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());
  beforeAll(async () => {
    await db.connect();
  });

  test('API should get a simple unit', async () => {
    const response = await withAuthentication(
      request(app).get('/language/unit/62391a30487d5ae343c82312'),
    );
    console.error(response);
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully fetched course');
    expect(result).toEqual(GET_SIMPLE_UNIT_EXPECTED);
  });

  test('No id results in error', async () => {
    const response = await withAuthentication(
      request(app).get('/language/unit/'),
    );

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test('Invalid id results in error', async () => {
    const response = await withAuthentication(
      request(app).get('/language/unit/62391a30487d5ae343caaaaa'),
    );

    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});
