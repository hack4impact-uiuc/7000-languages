let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  GET_LESSON,
  GET_LESSON_EXPECTED,
  GET_LESSON_MISSING_COURSE_ID,
  GET_LESSON_MISSING_LESSON_ID,
  GET_LESSON_MISSING_UNIT_ID,
  GET_LESSON_MISSING_ALL_DATA,
  GET_LESSON_DOES_NOT_EXIST,
  GET_LESSON_INVALID_ID,
  PATCH_LESSON_NAME,
  PATCH_LESSON_INVALID_ID,
  PATCH_LESSON_MISSING_ID,
  PATCH_LESSON_NON_EXISTENT_LESSON,
  PATCH_LESSON_SELECTED,
  PATCH_LESSON_DESCRIPTION,
  PATCH_LESSON_MULTIPLE_FIELDS,
  PATCH_LESSON_INVALID_FIELDS,
  PATCH_LESSON_DESCRIPTION_EXPECTED,
  PATCH_LESSON_INVALID_FIELDS_EXPECTED,
  PATCH_LESSON_MULTIPLE_FIELDS_EXPECTED,
  PATCH_LESSON_NAME_EXPECTED,
  PATCH_LESSON_SELECTED_EXPECTED,
} = require('../mock-data/lesson-mock-data');
const { withAuthentication } = require('../utils/auth');
const omitDeep = require('omit-deep-lodash');
const _ = require('lodash');

jest.mock('google-auth-library');
const { OAuth2Client } = require('google-auth-library');
const { verifyIdTokenMockReturnValue } = require('../mock-data/auth-mock-data');
const {
  SUCCESS_GETTING_LESSON_DATA,
  ERR_GETTING_LESSON_DATA,
  ERR_MISSING_OR_INVALID_DATA,
  SUCCESS_PATCHING_LESSON_DATA,
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

  test('Success getting vocab', async () => {
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
    var response = await withAuthentication(
      request(app).get(`/language/lesson${GET_LESSON_MISSING_ALL_DATA}`),
    );
    var message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);

    response = await withAuthentication(
      request(app).get(`/language/lesson${GET_LESSON_MISSING_COURSE_ID}`),
    );
    message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);

    response = await withAuthentication(
      request(app).get(`/language/lesson${GET_LESSON_MISSING_LESSON_ID}`),
    );
    message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);

    response = await withAuthentication(
      request(app).get(`/language/lesson${GET_LESSON_MISSING_UNIT_ID}`),
    );
    message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Error getting vocab - invalid length of course, unit, lesson id', async () => {
    const response = await withAuthentication(
      request(app).get(`/language/lesson${GET_LESSON_INVALID_ID}`),
    );
    const message = response.body.message;
    expect(response.status).toBe(404);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Error getting vocab - course, unit, and lesson does not exist', async () => {
    const response = await withAuthentication(
      request(app).get(`/language/lesson${GET_LESSON_DOES_NOT_EXIST}`),
    );
    const message = response.body.message;
    expect(response.status).toBe(404);
    expect(message).toEqual(ERR_GETTING_LESSON_DATA);
  });
});

// This block tests the PATCH /lesson/ endpoint.
describe('PATCH /lesson/ ', () => {
  /* 
          We have to make sure we connect to a MongoDB mock db before the test 
          and close the connection at the end.
        */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('Patch request should update name', async () => {
    const response = await withAuthentication(
      request(app).patch(`/language/lesson`).send(PATCH_LESSON_NAME),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_PATCHING_LESSON_DATA);
    expect(result).toEqual(PATCH_LESSON_NAME_EXPECTED);
  });

  test('Patch request should update selected', async () => {
    const response = await withAuthentication(
      request(app).patch(`/language/lesson`).send(PATCH_LESSON_SELECTED),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_PATCHING_LESSON_DATA);
    expect(result).toEqual(PATCH_LESSON_SELECTED_EXPECTED);
  });

  test('Patch request should update description', async () => {
    const response = await withAuthentication(
      request(app).patch(`/language/lesson`).send(PATCH_LESSON_DESCRIPTION),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_PATCHING_LESSON_DATA);
    expect(result).toEqual(PATCH_LESSON_DESCRIPTION_EXPECTED);
  });

  test('Patch request should update multiple fields', async () => {
    const response = await withAuthentication(
      request(app).patch(`/language/lesson`).send(PATCH_LESSON_MULTIPLE_FIELDS),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_PATCHING_LESSON_DATA);
    expect(result).toEqual(PATCH_LESSON_MULTIPLE_FIELDS_EXPECTED);
  });

  test('Patch request should do nothing for invalid fields', async () => {
    const response = await withAuthentication(
      request(app).patch(`/language/lesson`).send(PATCH_LESSON_INVALID_FIELDS),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_PATCHING_LESSON_DATA);
    expect(result).toEqual(PATCH_LESSON_INVALID_FIELDS_EXPECTED);
  });

  test('Patch request fails due to invalid id', async () => {
    const response = await withAuthentication(
      request(app).patch(`/language/lesson`).send(PATCH_LESSON_INVALID_ID),
    );
    const message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Patch request fails due to missing id', async () => {
    const response = await withAuthentication(
      request(app).patch(`/language/lesson`).send(PATCH_LESSON_MISSING_ID),
    );
    const message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Patch request fails due to non-existent lesson', async () => {
    const response = await withAuthentication(
      request(app)
        .patch(`/language/lesson`)
        .send(PATCH_LESSON_NON_EXISTENT_LESSON),
    );
    const message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });
});
