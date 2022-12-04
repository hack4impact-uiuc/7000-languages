let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');

const { withAuthentication } = require('../utils/auth');
const omitDeep = require('omit-deep-lodash');
const _ = require('lodash');

jest.mock('google-auth-library');
const { OAuth2Client } = require('google-auth-library');
const { verifyIdTokenMockReturnValue } = require('../mock-data/auth-mock-data');
const {
  SUCCESS_GETTING_LESSON_DATA,
  ERR_MISSING_OR_INVALID_DATA,
} = require('../../src/utils/constants');

const verifyIdTokenMock = OAuth2Client.prototype.verifyIdToken;
verifyIdTokenMock.mockImplementation(verifyIdTokenMockReturnValue);

// This block tests the GET /lesson/ endpoint.
describe('GET /lesson/ ', () => {
  /*
          We have to make sure we connect to a MongoDB mock db before the test
          and close the connection at the end.
        */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('Success getting lesson data', async () => {
    const response = await withAuthentication(
      request(app).get(`/language/lesson${GET_LESSON}`),
    );
    const message = response.body.message;

    const result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_GETTING_LESSON_DATA);
    expect(result).toEqual(GET_LESSON_EXPECTED);
  });

  test('Error getting vocab - missing data in request', async () => {
    const response = await withAuthentication(
      request(app).get(`/language/lesson${GET_LESSON_MISSING_LESSON_ID}`),
    );
    const message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Error getting vocab - invalid length of lesson id', async () => {
    const response = await withAuthentication(
      request(app).get(`/language/lesson${GET_LESSON_INVALID_ID}`),
    );
    const message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual('Invalid ObjectID');
  });

  test('Error getting vocab - lesson does not exist', async () => {
    const response = await withAuthentication(
      request(app).get(`/language/lesson${GET_LESSON_DOES_NOT_EXIST}`),
    );
    const message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });
});
