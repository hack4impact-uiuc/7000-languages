let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  GET_LESSON,
  GET_LESSON_EXPECTED,
  GET_LESSON_MISSING_LESSON_ID,
  GET_LESSON_DOES_NOT_EXIST,
  GET_LESSON_INVALID_ID,
  PUT_LESSON_UPDATE_SELECTED,
  PUT_LESSON_UPDATE_SELECTED_EXPECTED,
  PUT_LESSON_MOVE_TO_UNSELECTED,
  PUT_LESSON_MOVE_TO_UNSELECTED_EXPECTED,
  PUT_LESSON_UPDATE_ORDER,
  PUT_LESSON_UPDATE_ORDER_EXPECTED,
  PUT_LESSON_MISSING_ID,
  PUT_LESSON_INVALID_ID,
  PUT_LESSON_DUPLICATE_ORDER,
  PUT_LESSON_EXTRA_FIELDS,
  PUT_LESSON_EXTRA_FIELDS_EXPECTED,
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
  POST_LESSON,
  POST_LESSON_EXPECTED,
  POST_LESSON_MISSING_COURSE_ID,
  POST_LESSON_INVALID_COURSE_ID,
  POST_LESSON_INVALID_UNIT_ID,
  POST_LESSON_MISSING_REQUIRED_LESSON_DATA,
  POST_LESSON_EXTRA_DATA,
  POST_LESSON_EXTRA_DATA_EXPECTED,
} = require('../mock-data/lesson-mock-data');
const {
  POST_BERBER_LESSON,
  POST_BERBER_LESSON_EXPECTED,
  PATCH_BERBER_LESSON_DESCRIPTION,
  PATCH_BERBER_LESSON_DESCRIPTION_EXPECTED,
} = require('../mock-data/non-latin-mock-data');
const { withAuthentication } = require('../utils/auth');
const omitDeep = require('omit-deep-lodash');
const _ = require('lodash');

jest.mock('google-auth-library');
const { OAuth2Client } = require('google-auth-library');
const { verifyIdTokenMockReturnValue } = require('../mock-data/auth-mock-data');
const {
  SUCCESS_GETTING_LESSON_DATA,
  ERR_MISSING_OR_INVALID_DATA,
  SUCCESS_PATCHING_LESSON_DATA,
  SUCCESS_POSTING_LESSON_DATA,
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

// This block tests the POST /lesson/ endpoint.
describe('POST /lesson/ ', () => {
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('Success creating new lesson', async () => {
    const response = await withAuthentication(
      request(app).post(`/language/lesson`).send(POST_LESSON),
    );

    const message = response.body.message;
    const result = omitDeep(response.body.result, '_id', '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_POSTING_LESSON_DATA);
    expect(result).toEqual(POST_LESSON_EXPECTED);
  });

  test('Success creating new lesson', async () => {
    const response = await withAuthentication(
      request(app).post(`/language/lesson`).send(POST_LESSON_EXTRA_DATA),
    );

    const message = response.body.message;
    const result = omitDeep(response.body.result, '_id', '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_POSTING_LESSON_DATA);
    expect(result).toEqual(POST_LESSON_EXTRA_DATA_EXPECTED);
  });

  test('Error creating lesson - missing course id', async () => {
    const response = await withAuthentication(
      request(app).post(`/language/lesson`).send(POST_LESSON_MISSING_COURSE_ID),
    );
    const message = response.body.message;
    expect(response.status).toBe(403);
    expect(message).toEqual(
      'Authentication failed. Please log out and try again.',
    );
  });

  test('Error creating lesson - invalid course id', async () => {
    const response = await withAuthentication(
      request(app).post(`/language/lesson`).send(POST_LESSON_INVALID_COURSE_ID),
    );
    const message = response.body.message;
    expect(response.status).toBe(404);
    expect(message).toEqual('Course does not exist');
  });

  test('Error creating lesson - invalid unit id', async () => {
    const response = await withAuthentication(
      request(app).post(`/language/lesson`).send(POST_LESSON_INVALID_UNIT_ID),
    );
    const message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Error creating lesson - missing required vocab data', async () => {
    const response = await withAuthentication(
      request(app)
        .post(`/language/lesson`)
        .send(POST_LESSON_MISSING_REQUIRED_LESSON_DATA),
    );
    expect(response.status).toBe(500);
  });

  test('Success creating lesson with berber characters', async () => {
    const response = await withAuthentication(
      request(app).post(`/language/lesson`).send(POST_BERBER_LESSON),
    );

    const message = response.body.message;
    const result = omitDeep(response.body.result, '_id', '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_POSTING_LESSON_DATA);
    expect(result).toEqual(POST_BERBER_LESSON_EXPECTED);
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

  test('Patch request should update description with Berber characters', async () => {
    const response = await withAuthentication(
      request(app)
        .patch(`/language/lesson`)
        .send(PATCH_BERBER_LESSON_DESCRIPTION),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_PATCHING_LESSON_DATA);
    expect(result.description).toEqual(
      PATCH_BERBER_LESSON_DESCRIPTION_EXPECTED.description,
    );
  });
});

// This block tests the PUT /lesson/ endpoint.
describe('PUT /lesson/ ', () => {
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('Success updating selected and unselected lessons', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/lesson`).send(PUT_LESSON_UPDATE_SELECTED),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Updated lessons with success');
    expect(result).toEqual(PUT_LESSON_UPDATE_SELECTED_EXPECTED);
  });

  test('Success updating order', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/lesson`).send(PUT_LESSON_UPDATE_ORDER),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Updated lessons with success');
    expect(result).toEqual(PUT_LESSON_UPDATE_ORDER_EXPECTED);
  });

  test('Success moving all lessons to unselected', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/lesson`).send(PUT_LESSON_MOVE_TO_UNSELECTED),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Updated lessons with success');
    expect(result).toEqual(PUT_LESSON_MOVE_TO_UNSELECTED_EXPECTED);
  });

  test('Rejects missing lesson id', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/lesson`).send(PUT_LESSON_MISSING_ID),
    );
    expect(response.status).toBe(400);
  });

  test('Rejects invalid lesson id', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/lesson`).send(PUT_LESSON_INVALID_ID),
    );
    expect(response.status).toBe(400);
  });

  test('Rejects duplicate order', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/lesson`).send(PUT_LESSON_DUPLICATE_ORDER),
    );
    expect(response.status).toBe(400);
  });

  test('Success reordering lessons with extra fields', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/lesson`).send(PUT_LESSON_EXTRA_FIELDS),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Updated lessons with success');
    expect(result).toEqual(PUT_LESSON_EXTRA_FIELDS_EXPECTED);
  });
});
