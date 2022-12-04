let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const { SEARCH_COURSE_EXPECTED } = require('../mock-data/search-mock-data');

const { withAuthentication } = require('../utils/auth');
const omitDeep = require('omit-deep-lodash');
const _ = require('lodash');

jest.mock('google-auth-library');
const { OAuth2Client } = require('google-auth-library');
const { verifyIdTokenMockReturnValue } = require('../mock-data/auth-mock-data');

const verifyIdTokenMock = OAuth2Client.prototype.verifyIdToken;
verifyIdTokenMock.mockImplementation(verifyIdTokenMockReturnValue);

// This block tests the GET /learner/search endpoint.
describe('GET /learner/search ', () => {
  /*
          We have to make sure we connect to a MongoDB mock db before the test
          and close the connection at the end.
        */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('Success searching for courses', async () => {
    const response = await withAuthentication(
      request(app).get(`/learner/search`),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    const result = omitDeep(response.body.result, '__v', '_id', 'code');
    expect(response.status).toBe(200);
    expect(result).toEqual(SEARCH_COURSE_EXPECTED);
  });
});
