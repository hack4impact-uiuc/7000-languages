const _ = require('lodash');
let app = require('../../src/app');
const request = require('supertest');
const db = require('../utils/db');
const {
  POST_SIMPLE_USER,
  POST_SIMPLE_USER_EXPECTED,
} = require('../mock-data/user-mock-data');
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

const verifyIdTokenMock = OAuth2Client.prototype.verifyIdToken;
verifyIdTokenMock.mockResolvedValue(verifyIdTokenMockReturnValue);

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

  test('simple test', async () => {
    expect(1).toEqual(1);
  });

  // test('API should create user', async () => {
  //   const body = POST_SIMPLE_USER;
  //   const response = await request(app).post('/user/').send(body);

  //   const message = response.body.message;
  //   const result = _.omit(response.body.result, ['_id', '__v']);

  //   expect(message).toEqual('Successfully created a new user');
  //   expect(result).toEqual(POST_SIMPLE_USER_EXPECTED);
  // });

  // test('API should create user', async () => {
  //   const body = POST_SIMPLE_USER;
  //   const response = await withAuthentication(
  //     request(app).get('/user/').send(body),
  //   );

  //   const message = response.body.message;
  //   const result = _.omit(response.body.result, ['_id', '__v']);

  //   expect(message).toEqual('test data');
  // });
});
