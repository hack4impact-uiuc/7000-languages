let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const _ = require('lodash');
const {
  GET_SIMPLE_UNIT_EXPECTED,
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
  PATCH_UNIT_NAME_EXPECTED,
  PATCH_UNIT_NAME,
  PATCH_UNIT_SELECTED_EXPECTED,
  PATCH_UNIT_SELECTED,
  PATCH_UNIT_DESCRIPTION_EXPECTED,
  PATCH_UNIT_DESCRIPTION,
  PATCH_UNIT_NO_CHANGE_EXPECTED,
  PATCH_UNIT_ORDER,
  PATCH_UNIT_NONEXISTENT_FIELD,
  POST_SIMPLE_UNIT,
  POST_MISSING_REQ_UNIT,
  POST_EXTRA_FIELD_UNIT,
  POST_INVALID_COURSE_UNIT,
  POST_EXPECTED_UNIT,
} = require('../mock-data/unit-mock-data');
const {
  POST_BERBER_UNIT,
  POST_BERBER_UNIT_EXPECTED,
  PATCH_BERBER_UNIT,
  PATCH_BERBER_UNIT_EXPECTED,
} = require('../mock-data/non-latin-mock-data');
const { withAuthentication } = require('../utils/auth');
const omitDeep = require('omit-deep-lodash');

jest.mock('google-auth-library');
const { OAuth2Client } = require('google-auth-library');
const { verifyIdTokenMockReturnValue } = require('../mock-data/auth-mock-data');

const verifyIdTokenMock = OAuth2Client.prototype.verifyIdToken;
verifyIdTokenMock.mockImplementation(verifyIdTokenMockReturnValue);

// This block tests the GET /unit/ endpoint.
describe('GET /language/unit/ ', () => {
  /*
    We have to make sure we connect to a MongoDB mock db before the test
    and close the connection at the end.
  */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());
  beforeAll(async () => {
    await db.connect();
  });

  test('API should get a simple unit', async () => {
    const response = await withAuthentication(
      request(app).get(
        '/language/unit?course_id=62391a30487d5ae343c82311&unit_id=62391a30487d5ae343c82312',
      ),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully fetched course');
    expect(result).toEqual(GET_SIMPLE_UNIT_EXPECTED);
  });

  test('No id results in error', async () => {
    const response = await withAuthentication(
      request(app).get('/language/unit'),
    );

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test('Invalid id results in error', async () => {
    const response = await withAuthentication(
      request(app).get(
        '/language/unit?course_id=62391a30487d5ae343c82311&unit_id=62391a30487d5ae343caaaaa',
      ),
    );

    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});

// This block tests the PATCH /unit/ endpoint.
describe('PATCH /unit/ ', () => {
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('Patch should update name', async () => {
    const response = await withAuthentication(
      request(app)
        .patch(`/language/unit/62391a30487d5ae343c82312`)
        .send(PATCH_UNIT_NAME),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully updated unit');
    expect(result).toEqual(PATCH_UNIT_NAME_EXPECTED);
  });

  test('Patch should update selection', async () => {
    const response = await withAuthentication(
      request(app)
        .patch(`/language/unit/62391a30487d5ae343c82312`)
        .send(PATCH_UNIT_SELECTED),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully updated unit');
    expect(result).toEqual(PATCH_UNIT_SELECTED_EXPECTED);
  });

  test('Patch should update description', async () => {
    const response = await withAuthentication(
      request(app)
        .patch(`/language/unit/62391a30487d5ae343c82312`)
        .send(PATCH_UNIT_DESCRIPTION),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully updated unit');
    expect(result).toEqual(PATCH_UNIT_DESCRIPTION_EXPECTED);
  });

  test('Patch should do nothing for order updates', async () => {
    const response = await withAuthentication(
      request(app)
        .patch(`/language/unit/62391a30487d5ae343c82312`)
        .send(PATCH_UNIT_ORDER),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully updated unit');
    expect(result).toEqual(PATCH_UNIT_NO_CHANGE_EXPECTED);
  });

  test('Patch should do nothing for nonexistent field', async () => {
    const response = await withAuthentication(
      request(app)
        .patch(`/language/unit/62391a30487d5ae343c82312`)
        .send(PATCH_UNIT_NONEXISTENT_FIELD),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully updated unit');
    expect(result).toEqual(PATCH_UNIT_NO_CHANGE_EXPECTED);
  });

  test('Patch should update name with Berber characters', async () => {
    const response = await withAuthentication(
      request(app)
        .patch(`/language/unit/62391a30487d5ae343c82312`)
        .send(PATCH_BERBER_UNIT),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', 'vocab');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully updated unit');
    expect(result.name).toEqual(PATCH_BERBER_UNIT_EXPECTED.name);
  });
});

// This block tests the POST /unit/ endpoint.
describe('POST /language/unit/ ', () => {
  /*
    We have to make sure we connect to a MongoDB mock db before the test
    and close the connection at the end.
  */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());
  beforeAll(async () => {
    await db.connect();
  });

  test('API should post a simple unit', async () => {
    const response = await withAuthentication(
      request(app).post('/language/unit').send(POST_SIMPLE_UNIT),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', '_id');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully created a new unit');
    expect(result).toEqual(POST_EXPECTED_UNIT);
  });

  test('Missing required field should fail', async () => {
    const response = await withAuthentication(
      request(app).post('/language/unit').send(POST_MISSING_REQ_UNIT),
    );
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test('Invalid course id should fail', async () => {
    const response = await withAuthentication(
      request(app).post('/language/unit').send(POST_INVALID_COURSE_UNIT),
    );
    expect(response.status).toBe(404);
  });

  test('Additional field should still post', async () => {
    const response = await withAuthentication(
      request(app).post('/language/unit').send(POST_EXTRA_FIELD_UNIT),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', '_id');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully created a new unit');
    expect(result).toEqual(POST_EXPECTED_UNIT);
  });

  test('Field with Berber characters should still post', async () => {
    const response = await withAuthentication(
      request(app).post('/language/unit').send(POST_BERBER_UNIT),
    );
    const message = response.body.message;
    const result = omitDeep(response.body.result, '__v', '_id');
    expect(response.status).toBe(200);
    expect(message).toEqual('Successfully created a new unit');
    expect(result).toEqual(POST_BERBER_UNIT_EXPECTED);
  });

  test('Learner attempt to post unit should fail', async () => {
    const response = await withAuthentication(
      request(app).post('/language/unit').send(POST_SIMPLE_UNIT),
      '69023be1-368c-4a86-8eb0-9771bffa0186',
    );
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});

// This block tests the PUT /unit/ endpoint.
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
