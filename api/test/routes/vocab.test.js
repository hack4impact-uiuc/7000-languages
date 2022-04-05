let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
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

// This block tests the POST /user/ endpoint.
describe('POST /vocab/ ', () => {
  /* 
        We have to make sure we connect to a MongoDB mock db before the test 
        and close the connection at the end.
      */
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
    expect(response.status).toBe(404);
    expect(message).toEqual(ERR_MISSING_OR_INVALID_DATA);
  });
});
