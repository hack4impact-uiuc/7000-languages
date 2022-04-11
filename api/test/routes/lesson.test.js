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
    const response = await withAuthentication(
      request(app).get(`/language/lesson${GET_LESSON_MISSING_LESSON_ID}`),
    );
    const message = response.body.message;
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
