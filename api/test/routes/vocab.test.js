let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  PATCH_VOCAB_ITEM,
  PATCH_VOCAB_ITEM_EXPECTED,
  PATCH_VOCAB_ITEM_EXTRA_FIELDS,
  PATCH_VOCAB_ITEM_EXTRA_FIELDS_EXPECTED,
  PATCH_VOCAB_ITEM_MISSING_VOCAB,
  PATCH_VOCAB_ITEM_MISSING_ID,
  PATCH_VOCAB_ITEM_INVALID_ID,
  PATCH_VOCAB_SECOND_ITEM,
  PATCH_VOCAB_SECOND_ITEM_EXPECTED,
  PATCH_VOCAB_ITEM_INVALID_VOCAB,
  PATCH_VOCAB_ITEM_INVALID_VOCAB_EXPECTED,
  POST_FIRST_VOCAB_ITEM,
  POST_FIRST_VOCAB_ITEM_EXPECTED,
  POST_SECOND_VOCAB_ITEM,
  POST_SECOND_VOCAB_ITEM_EXPECTED,
  POST_DETAILED_VOCAB_ITEM,
  POST_DETAILED_VOCAB_ITEM_EXPECTED,
  POST_VOCAB_ITEM_MISSING_REQUIRED_FIELDS,
  POST_VOCAB_ITEM_EXTRA_FIELDS,
  POST_VOCAB_ITEM_INVALID_ID,
  POST_VOCAB_ITEM_MISSING_ID,
} = require('../mock-data/vocab-mock-data');
const {
  POST_BERBER_VOCAB_ITEM,
  POST_BERBER_VOCAB_ITEM_EXPECTED,
} = require('../mock-data/non-latin-mock-data');
const { withAuthentication } = require('../utils/auth');
const omitDeep = require('omit-deep-lodash');
const _ = require('lodash');
const {
  ERR_MISSING_OR_INVALID_DATA,
  SUCCESS_POSTING_VOCAB_DATA,
} = require('../../src/utils/constants');

jest.mock('google-auth-library');
const { OAuth2Client } = require('google-auth-library');
const { verifyIdTokenMockReturnValue } = require('../mock-data/auth-mock-data');

const verifyIdTokenMock = OAuth2Client.prototype.verifyIdToken;
verifyIdTokenMock.mockImplementation(verifyIdTokenMockReturnValue);

// This block tests the PATCH /vocab/ endpoint.
describe('PATCH /vocab/ ', () => {
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('Updates vocab item with success', async () => {
    const response = await withAuthentication(
      request(app).patch('/language/vocab/').send(PATCH_VOCAB_ITEM),
    );

    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully updated vocab item');
    expect(result).toEqual(PATCH_VOCAB_ITEM_EXPECTED);
  });

  test('Updates multiple vocab items with success', async () => {
    var response = await withAuthentication(
      request(app).patch('/language/vocab/').send(PATCH_VOCAB_ITEM),
    );

    var message = response.body.message;
    var result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully updated vocab item');
    expect(result).toEqual(PATCH_VOCAB_ITEM_EXPECTED);

    response = await withAuthentication(
      request(app).patch('/language/vocab/').send(PATCH_VOCAB_SECOND_ITEM),
    );

    message = response.body.message;
    result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully updated vocab item');
    expect(result).toEqual(PATCH_VOCAB_SECOND_ITEM_EXPECTED);
  });

  test('Updates vocab item with extra fields successfully', async () => {
    const response = await withAuthentication(
      request(app)
        .patch('/language/vocab/')
        .send(PATCH_VOCAB_ITEM_EXTRA_FIELDS),
    );

    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully updated vocab item');
    expect(result).toEqual(PATCH_VOCAB_ITEM_EXTRA_FIELDS_EXPECTED);
  });

  test('Error updating vocab item due to missing id', async () => {
    const response = await withAuthentication(
      request(app).patch('/language/vocab/').send(PATCH_VOCAB_ITEM_MISSING_ID),
    );

    const message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Error updating vocab item due to invalid id', async () => {
    const response = await withAuthentication(
      request(app).patch('/language/vocab/').send(PATCH_VOCAB_ITEM_INVALID_ID),
    );

    const message = response.body.message;
    expect(response.status).toBe(404);
    expect(message).toEqual('Vocab item not found');
  });

  test('Error updating vocab item due to missing vocab item', async () => {
    const response = await withAuthentication(
      request(app)
        .patch('/language/vocab/')
        .send(PATCH_VOCAB_ITEM_MISSING_VOCAB),
    );

    const message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Does not update vocab item due to invalid vocab item', async () => {
    const response = await withAuthentication(
      request(app)
        .patch('/language/vocab/')
        .send(PATCH_VOCAB_ITEM_INVALID_VOCAB),
    );

    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully updated vocab item');
    expect(result).toEqual(PATCH_VOCAB_ITEM_INVALID_VOCAB_EXPECTED);
  });
});

// This block tests the POST /vocab/ endpoint.
describe('POST /vocab/ ', () => {
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('Create two new vocab items with success', async () => {
    var response = await withAuthentication(
      request(app).post('/language/vocab/').send(POST_FIRST_VOCAB_ITEM),
    );
    var message = response.body.message;
    var result = omitDeep(response.body.result, '_id', '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_POSTING_VOCAB_DATA); // TODO: Ask developers - should this be a constant value?
    expect(result).toEqual(POST_FIRST_VOCAB_ITEM_EXPECTED);

    response = await withAuthentication(
      request(app).post('/language/vocab/').send(POST_SECOND_VOCAB_ITEM),
    );
    message = response.body.message;
    result = omitDeep(response.body.result, '_id', '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_POSTING_VOCAB_DATA);
    expect(result).toEqual(POST_SECOND_VOCAB_ITEM_EXPECTED);
  });

  test('Creates a detailed vocab item with success', async () => {
    const response = await withAuthentication(
      request(app).post('/language/vocab/').send(POST_DETAILED_VOCAB_ITEM),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '_id', '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_POSTING_VOCAB_DATA);
    expect(result).toEqual(POST_DETAILED_VOCAB_ITEM_EXPECTED);
  });

  test('Creates a vocab item with extra fields successfully', async () => {
    var response = await withAuthentication(
      request(app).post('/language/vocab/').send(POST_VOCAB_ITEM_EXTRA_FIELDS),
    );
    var message = response.body.message;
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_POSTING_VOCAB_DATA);
  });

  test('Error creating new vocab item - Missing required vocab item fields', async () => {
    var response = await withAuthentication(
      request(app)
        .post('/language/vocab/')
        .send(POST_VOCAB_ITEM_MISSING_REQUIRED_FIELDS),
    );
    var message = response.body.message;
    expect(response.status).toBe(404);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Error creating new vocab item - missing course, unit, and/or lesson id', async () => {
    var response = await withAuthentication(
      request(app).post('/language/vocab/').send(POST_VOCAB_ITEM_MISSING_ID),
    );
    var message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Error creating new vocab item - invalid course, unit, and/or lesson id', async () => {
    var response = await withAuthentication(
      request(app).post('/language/vocab/').send(POST_VOCAB_ITEM_INVALID_ID),
    );
    var message = response.body.message;
    expect(response.status).toBe(400);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });

  test('Create a Berber vocab item with success', async () => {
    var response = await withAuthentication(
      request(app).post('/language/vocab/').send(POST_BERBER_VOCAB_ITEM),
    );
    var message = response.body.message;
    var result = omitDeep(response.body.result, '_id', '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual(SUCCESS_POSTING_VOCAB_DATA);
    expect(result).toEqual(POST_BERBER_VOCAB_ITEM_EXPECTED);
  });
});

// This block tests the DELETE /vocab/ endpoint.
describe('DELETE /vocab/ ', () => {});
