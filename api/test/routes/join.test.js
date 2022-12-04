let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  POST_JOIN_COURSE,
  POST_JOIN_PRIVATE,
  POST_WRONG_CODE,
  POST_NO_CODE,
  POST_INVALID_COURSE,
  POST_NONEXISTANT_COURSE,
} = require('../mock-data/join-mock-data');
const { withAuthentication } = require('../utils/auth');
const _ = require('lodash');
const {
  ERR_MISSING_OR_INVALID_DATA,
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

describe('POST /learner/join/ ', () => {
  /*
        We have to make sure we connect to a MongoDB mock db before the test
        and close the connection at the end.
      */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());
  beforeAll(async () => {
    await db.connect();
  });

  test('Learner can join course', async () => {
    const response = await withAuthentication(
      request(app).post('/learner/join').send(POST_JOIN_COURSE),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    expect(response.status).toBe(200);
  });

  test('Learner cannot mark lesson twice', async () => {
    await withAuthentication(
      request(app).post('/learner/join').send(POST_JOIN_COURSE),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    const response = await withAuthentication(
      request(app).post('/learner/join').send(POST_JOIN_COURSE),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    const message = response.body.message;

    expect(response.status).toBe(400);
    expect(message).toEqual('User has already joined course');
  });

  test('Learner can join private course', async () => {
    const response = await withAuthentication(
      request(app).post('/learner/join').send(POST_JOIN_PRIVATE),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    expect(response.status).toBe(200);
  });

  test('Learner cannot join private course with invalid code', async () => {
    const response = await withAuthentication(
      request(app).post('/learner/join').send(POST_WRONG_CODE),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    const message = response.body.message;

    expect(response.status).toBe(403);
    expect(message).toEqual("You are not authorized to access this course.");
  });

  test('User cannot join private course with no code', async () => {
    const response = await withAuthentication(
      request(app).post('/learner/join').send(POST_NO_CODE),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    const message = response.body.message;

    expect(response.status).toBe(403);
    expect(message).toEqual("You are not authorized to access this course.");
  });

  test('Fail to join course with empty body', async () => {
    const response = await withAuthentication(
      request(app).post('/learner/join').send({}),
    );

    const message = response.body.message;

    expect(response.status).toBe(403);
    expect(message).toEqual(ERR_AUTH_FAILED);
  });

  test('Fail to join course with invalid course_id', async () => {
    const response = await withAuthentication(
      request(app).post('/learner/join').send(POST_INVALID_COURSE),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    const message = response.body.message;

    expect(response.status).toBe(400);
    expect(message).toEqual('Invalid ObjectID');
  });

  test('Fail to join non-existing course', async () => {
    const response = await withAuthentication(
      request(app)
        .post('/learner/join')
        .send(POST_NONEXISTANT_COURSE),
    );

    const message = response.body.message;

    expect(response.status).toBe(404);
    expect(message).toEqual('Course does not exist');
  });
});
