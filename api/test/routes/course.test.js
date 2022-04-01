let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  POST_SIMPLE_COURSE,
  POST_SIMPLE_COURSE_EXPECTED,
  POST_MISSING_NON_REQ_FIELD_COURSE,
  POST_MISSING_NON_REQ_FIELD_COURSE_EXPECTED,
  POST_WRONG_COURSE_MISSING_NAME,
  POST_COURSE_ADDITIONAL_FIELDS,
  POST_COURSE_ADDITIONAL_FIELDS_EXPECTED,
} = require('../mock-data/course-mock-data');
const { withAuthentication } = require('../utils/auth');
const omitDeep = require('omit-deep-lodash');

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

  test('API should create course', async () => {
    const body = POST_SIMPLE_COURSE;

    const response = await withAuthentication(
      request(app).post('/language/course/').send(body),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '_id', '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully created a new course');
    expect(result).toEqual(POST_SIMPLE_COURSE_EXPECTED);
  });

  test('Missing non req field should create course', async () => {
    const body = POST_MISSING_NON_REQ_FIELD_COURSE;

    const response = await withAuthentication(
      request(app).post('/language/course/').send(body),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '_id', '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully created a new course');
    expect(result).toEqual(POST_MISSING_NON_REQ_FIELD_COURSE_EXPECTED);
  });

  test('No id token results in error', async () => {
    const body = POST_WRONG_COURSE_MISSING_NAME;

    const response = await withAuthentication(
      request(app).post('/language/course/').send(body),
    );

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test('Additional fields should create course', async () => {
    const body = POST_COURSE_ADDITIONAL_FIELDS;

    const response = await withAuthentication(
      request(app).post('/language/course/').send(body),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '_id', '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully created a new course');
    expect(result).toEqual(POST_COURSE_ADDITIONAL_FIELDS_EXPECTED);
  });
});

describe('DELETE /language/course/ ', () => {
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('API should delete course', async () => {
    const response = await withAuthentication(
      request(app).delete('/language/course/62391a30487d5ae343c82311').send(),
    );
    const message = response.body.message;
    expect(response.status).toBe(200);
    expect(message).toEqual(
      'Successfully deleted course and associated units + lessons',
    );
  });

  test('API should return 404 course if course does not exist', async () => {
    const response = await withAuthentication(
      request(app).delete('/language/course/62391a30487d5ae343c82311').send(),
    );
    const message = response.body.message;
    expect(response.status).toBe(200);
    expect(message).toEqual(
      'Successfully deleted course and associated units + lessons',
    );

    const second_response = await withAuthentication(
      request(app).delete('/language/course/62391a30487d5ae343c82311').send(),
    );
    const second_message = second_response.body.message;
    expect(second_response.status).toBe(404);
    expect(second_message).toEqual('Course not found');
  });
});
