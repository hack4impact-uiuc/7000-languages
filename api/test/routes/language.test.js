const _ = require('lodash');
let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  PUT_EXPECTED_COURSE_UPDATED_APPROVAL,
  PUT_EXPECTED_COURSE_UPDATED_ADMIN_ID,
  PUT_EXPECTED_COURSE_UPDATED_COURSE_DETAILS,
  PUT_UPDATE_APPROVAL,
  PUT_UPDATE_ADMIN_ID,
  PUT_UPDATE_COURSE_DETAILS,
  PUT_UPDATE_INVALID_FIELD,
  PUT_UPDATE_NON_BOOLEAN_APPROVAL,
} = require('../mock-data/language-mock-data');
const { withAuthentication } = require('../utils/auth');

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
const { PUT_INVALID_FIELD } = require('../mock-data/language-mock-data');

const verifyIdTokenMock = OAuth2Client.prototype.verifyIdToken;
verifyIdTokenMock.mockImplementation(verifyIdTokenMockReturnValue);

// This block tests the PUT /course/ endpoint.
describe('PUT /course/ ', () => {
  /* 
    We have to make sure we connect to a MongoDB mock db before the test 
    and close the connection at the end.
  */
  afterAll(async () => await db.closeDatabase());
  afterEach(async () => await db.resetDatabase());

  beforeAll(async () => {
    await db.connect();
  });

  test('simple test', async () => {
    expect(1).toEqual(1);
  });

  test('Put request should update course approval status', async () => {
    const original = require("../db-data/courses");

    const body =  PUT_UPDATE_APPROVAL;
    const response = await request(app).put('/course/' + original._id/* ? */).send(body);

    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(result).toEqual(PUT_EXPECTED_COURSE_UPDATED_APPROVAL);
    expect(response.status).toBe(200);
  });

  test('Put request should updated course admin id', async () => {
    const original = require("../db-data/courses");

    const body =  PUT_UPDATE_ADMIN_ID;
    const response = await request(app).put('/course/' + original._id/* ? */).send(body);

    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(result).toEqual(PUT_EXPECTED_COURSE_UPDATED_ADMIN_ID);
    expect(response.status).toBe(200);
  });

  test('Put request should updated course details', async () => {
    const original = require("../db-data/courses");

    const body =  PUT_UPDATE_COURSE_DETAILS;
    const response = await request(app).put('/course/' + original._id/* ? */).send(body);

    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(result).toEqual(PUT_EXPECTED_COURSE_UPDATED_COURSE_DETAILS);
    expect(response.status).toBe(200);
  });

  test('Put request should do nothing for invalid fields', async () => {
    const original = require("../db-data/courses");

    const body =  PUT_UPDATE_INVALID_FIELD;
    const response = await request(app).put('/course/' + original._id/* ? */).send(body);

    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(result).toEqual(original);
    expect(response.status).toBe(200);
  });

  test('Put request should maintain boolean type for approval status', async () => {
    const original = require("../db-data/courses");

    const body =  PUT_UPDATE_NON_BOOLEAN_APPROVAL;
    const response = await request(app).put('/course/' + original._id/* ? */).send(body);

    const result = _.omit(response.body.result, ['_id', '__v']);

    expect(result).toEqual(original);
    expect(response.status).toBe(200);
  });  
});
