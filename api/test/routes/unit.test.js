let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  PUT_UNIT_UPDATE_SELECTED,
  PUT_UNIT_UPDATE_SELECTED_EXPECTED,
  PUT_UNIT_MOVE_TO_UNSELECTED,
  PUT_UNIT_MOVE_TO_UNSELECTED_EXPECTED,
  PUT_UNIT_UPDATE_ORDER,
  PUT_UNIT_UPDATE_ORDER_EXPECTED,
  PUT_UNIT_MISSING_ID,
  PUT_UNIT_INVALID_ID,
  PUT_UNIT_DUPLICATE_ORDER,
  PUT_UNIT_EXTRA_FIELDS,
  PUT_UNIT_EXTRA_FIELDS_EXPECTED,
} = require('../mock-data/unit-mock-data');
const { withAuthentication } = require('../utils/auth');
const omitDeep = require('omit-deep-lodash');

jest.mock('google-auth-library');
const { OAuth2Client } = require('google-auth-library');
const { verifyIdTokenMockReturnValue } = require('../mock-data/auth-mock-data');

const verifyIdTokenMock = OAuth2Client.prototype.verifyIdToken;
verifyIdTokenMock.mockImplementation(verifyIdTokenMockReturnValue);

// This block tests the PUT /lesson/ endpoint.
describe('PUT /unit/ ', () => {
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('Success updating selected and unselected units', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/unit`).send(PUT_UNIT_UPDATE_SELECTED),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Updated units with success');
    expect(result).toEqual(PUT_UNIT_UPDATE_SELECTED_EXPECTED);
  });

  test('Success updating order', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/unit`).send(PUT_UNIT_UPDATE_ORDER),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Updated units with success');
    expect(result).toEqual(PUT_UNIT_UPDATE_ORDER_EXPECTED);
  });

  test('Success moving all lessons to unselected', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/unit`).send(PUT_UNIT_MOVE_TO_UNSELECTED),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Updated units with success');
    expect(result).toEqual(PUT_UNIT_MOVE_TO_UNSELECTED_EXPECTED);
  });

  test('Rejects missing unit id', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/unit`).send(PUT_UNIT_MISSING_ID),
    );
    expect(response.status).toBe(400);
  });

  test('Rejects invalid unit id', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/unit`).send(PUT_UNIT_INVALID_ID),
    );
    expect(response.status).toBe(400);
  });

  test('Rejects duplicate order', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/unit`).send(PUT_UNIT_DUPLICATE_ORDER),
    );
    expect(response.status).toBe(400);
  });

  test('Success reordering units with extra fields', async () => {
    const response = await withAuthentication(
      request(app).put(`/language/unit`).send(PUT_UNIT_EXTRA_FIELDS),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Updated units with success');
    expect(result).toEqual(PUT_UNIT_EXTRA_FIELDS_EXPECTED);
  });
});
