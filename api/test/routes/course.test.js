let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  GET_SIMPLE_COURSE_EXPECTED,
  POST_SIMPLE_COURSE,
  POST_SIMPLE_COURSE_EXPECTED,
  POST_MISSING_NON_REQ_FIELD_COURSE,
  POST_MISSING_NON_REQ_FIELD_COURSE_EXPECTED,
  POST_WRONG_COURSE_MISSING_NAME,
  POST_COURSE_ADDITIONAL_FIELDS,
  POST_COURSE_ADDITIONAL_FIELDS_EXPECTED,
  PATCH_ORIGINAL_COURSE,
  PATCH_EXPECTED_COURSE_UPDATED_APPROVAL,
  PATCH_EXPECTED_COURSE_UPDATED_COURSE_DETAILS,
  PATCH_UPDATE_APPROVAL,
  PATCH_UPDATE_COURSE_DETAILS,
  PATCH_UPDATE_INVALID_FIELD,
  PATCH_UPDATE_NON_BOOLEAN_APPROVAL,
} = require('../mock-data/course-mock-data');
const {
  POST_BERBER_COURSE,
  POST_BERBER_COURSE_EXPECTED,
  PATCH_BERBER_COURSE,
  PATCH_BERBER_COURSE_EXPECTED,
} = require('../mock-data/non-latin-mock-data');
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

describe('GET /language/course/ ', () => {
  /*
    We have to make sure we connect to a MongoDB mock db before the test
    and close the connection at the end.
  */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());
  beforeAll(async () => {
    await db.connect();
  });

  test('API should get a simple course', async () => {
    const response = await withAuthentication(
      request(app).get('/language/course/62391a30487d5ae343c82311'),
    );

    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'code');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully fetched course');
    expect(result).toEqual(GET_SIMPLE_COURSE_EXPECTED);
  });

  test('No id results in error', async () => {
    const response = await withAuthentication(
      request(app).get('/language/course/'),
    );

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test('Invalid id results in error', async () => {
    const response = await withAuthentication(
      request(app).get('/language/course/62391a30487d5ae343caaaaa'),
    );

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test('Valid learner id results in success', async () => {
    const response = await withAuthentication(
      request(app).get('/language/course/62391a30487d5ae343c82311'),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );

    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'code', 'complete');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully fetched course');
    expect(result).toEqual(GET_SIMPLE_COURSE_EXPECTED);
  });

  test('Invalid learner id results in error', async () => {
    const response = await withAuthentication(
      request(app).get('/language/course/62391a30487d5ae343c82311'),
      '6c07121f-e2b0-48c3-a22f-3cb07b12ff79',
    );

    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});

// This block tests the POST /user/ endpoint.
describe('POST /language/course/ ', () => {
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

  test('Fields with berber text should create course', async () => {
    const body = POST_BERBER_COURSE;

    const response = await withAuthentication(
      request(app).post('/language/course/').send(body),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '_id', '__v', 'code');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully created a new course');
    expect(result).toEqual(POST_BERBER_COURSE_EXPECTED);
  });
});

// This block tests the PATCH language/course/ endpoint.
describe('PATCH /language/course/ ', () => {
  /*
      We have to make sure we connect to a MongoDB mock db before the test
      and close the connection at the end.
    */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('Patch request should update course approval status', async () => {
    const body = PATCH_UPDATE_APPROVAL;
    const response = await withAuthentication(
      request(app)
        .patch('/language/course/62391a30487d5ae343c82311')
        .send(body),
    );

    const result = _.omit(response.body.result, ['_id', '__v', 'details.code']);
    delete result['details']['_id'];

    expect(result).toEqual(PATCH_EXPECTED_COURSE_UPDATED_APPROVAL);
    expect(response.status).toBe(200);
  });

  test('Patch request should updated course details', async () => {
    const body = PATCH_UPDATE_COURSE_DETAILS;
    const response = await withAuthentication(
      request(app)
        .patch('/language/course/62391a30487d5ae343c82311')
        .send(body),
    );

    const result = _.omit(response.body.result, ['_id', '__v']);
    delete result['details']['_id'];

    expect(result).toEqual(PATCH_EXPECTED_COURSE_UPDATED_COURSE_DETAILS);
    expect(response.status).toBe(200);
  });

  test('Patch request should do nothing for invalid fields', async () => {
    const original = PATCH_ORIGINAL_COURSE;

    const body = PATCH_UPDATE_INVALID_FIELD;
    const response = await withAuthentication(
      request(app)
        .patch('/language/course/62391a30487d5ae343c82311')
        .send(body),
    );

    const result = _.omit(response.body.result, ['_id', '__v', 'details.code']);
    delete result['details']['_id'];

    expect(result).toEqual(original);
    expect(response.status).toBe(200);
  });

  test('Patch request should maintain boolean type for approval status', async () => {
    const original = PATCH_ORIGINAL_COURSE;

    const body = PATCH_UPDATE_NON_BOOLEAN_APPROVAL;
    const response = await withAuthentication(
      request(app)
        .patch('/language/course/62391a30487d5ae343c82311')
        .send(body),
    );

    const result = _.omit(response.body.result, ['_id', '__v', 'details.code']);
    delete result['details']['_id'];

    expect(result).toEqual(original);
    expect(response.status).toBe(200);
  });

  test('Patch request specifies invalid course id', async () => {
    const body = PATCH_UPDATE_APPROVAL;
    const response = await withAuthentication(
      request(app).patch('/language/course/12345').send(body),
    );
    const message = response.body.message;

    expect(response.status).toBe(400);
    expect(message).toEqual('Invalid ObjectID');
  });

  test('Patch request specifies nonexistent course', async () => {
    const body = PATCH_UPDATE_APPROVAL;
    const response = await withAuthentication(
      request(app)
        .patch('/language/course/62391a30487d5ae343c82310')
        .send(body),
    );
    const message = response.body.message;

    expect(response.status).toBe(404);
    expect(message).toEqual('Course does not exist');
  });

  test('Patch request should work with Berber characters', async () => {
    const body = PATCH_BERBER_COURSE;
    const response = await withAuthentication(
      request(app)
        .patch('/language/course/62391a30487d5ae343c82311')
        .send(body),
    );

    const result = _.omit(response.body.result, ['_id', '__v', 'details.code']);
    delete result['details']['_id'];

    expect(result).toEqual(PATCH_BERBER_COURSE_EXPECTED);
    expect(response.status).toBe(200);
  });
});
