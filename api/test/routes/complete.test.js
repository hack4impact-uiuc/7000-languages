let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  POST_COMPLETE_LESSON,
  POST_INVALID_LESSON,
  POST_MISSING_LESSON,
  POST_LESSON_INVALID_COURSE,
  POST_LESSON_NONEXISTING_COURSE,
} = require('../mock-data/complete-mock-data');
const { withAuthentication } = require('../utils/auth');
const _ = require('lodash');
const {
  ERR_MISSING_OR_INVALID_DATA,
  ERR_NOT_AUTHORIZED,
  ERR_AUTH_FAILED,
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

describe('POST /learner/complete/ ', () => {
  /*
        We have to make sure we connect to a MongoDB mock db before the test
        and close the connection at the end.
      */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());
  beforeAll(async () => {
    await db.connect();
  });

  test('Learner can mark lesson as complete', async () => {
    const response = await withAuthentication(
      request(app).post('/learner/complete').send(POST_COMPLETE_LESSON),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    expect(response.status).toBe(200);
  });

  test('Learner cannot mark lesson twice', async () => {
    await withAuthentication(
      request(app).post('/learner/complete').send(POST_COMPLETE_LESSON),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    const response = await withAuthentication(
      request(app).post('/learner/complete').send(POST_COMPLETE_LESSON),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    const message = response.body.message;

    expect(response.status).toBe(400);
    expect(message).toEqual('Lesson has already been marked as complete');
  });

  test('Fail to mark invalid lesson as complete', async () => {
    const response = await withAuthentication(
      request(app).post('/learner/complete').send(POST_INVALID_LESSON),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    const message = response.body.message;

    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Fail to mark incomplete lesson as complete', async () => {
    const response = await withAuthentication(
      request(app).post('/learner/complete').send(POST_MISSING_LESSON),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    const message = response.body.message;

    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Fail to mark lesson complete for non-learner', async () => {
    const response = await withAuthentication(
      request(app).post('/learner/complete').send(POST_COMPLETE_LESSON),
    );

    const message = response.body.message;

    expect(response.status).toBe(403);
    expect(message).toEqual(ERR_NOT_AUTHORIZED);
  });

  test('Fail to mark lesson complete with empty body', async () => {
    const response = await withAuthentication(
      request(app).post('/learner/complete').send({}),
    );

    const message = response.body.message;

    expect(response.status).toBe(403);
    expect(message).toEqual(ERR_AUTH_FAILED);
  });

  test('Fail to mark lesson complete with invalid course_id', async () => {
    const response = await withAuthentication(
      request(app).post('/learner/complete').send(POST_LESSON_INVALID_COURSE),
    );

    const message = response.body.message;

    expect(response.status).toBe(400);
    expect(message).toEqual('Invalid ObjectID');
  });

  test('Fail to mark lesson complete with non-existing course', async () => {
    const response = await withAuthentication(
      request(app)
        .post('/learner/complete')
        .send(POST_LESSON_NONEXISTING_COURSE),
    );

    const message = response.body.message;

    expect(response.status).toBe(404);
    expect(message).toEqual('Course does not exist');
  });
});
