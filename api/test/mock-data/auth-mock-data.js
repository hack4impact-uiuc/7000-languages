const { DEFAULT_ID_TOKEN } = require('../utils/constants');

/* 
This function mocks the return value of the verifyIdToken() method of 
the OAuth2Client class, which is part of google-auth-library.
for more details on the function, visit: https://github.com/googleapis/google-auth-library-nodejs/blob/main/src/auth/oauth2client.ts 
*/
module.exports.verifyIdTokenMockReturnValue = (data) => {
  const userData = GOOGLE_AUTH_USER_DATA;
  if (data.idToken !== DEFAULT_ID_TOKEN) {
    userData.sub = data.idToken;
  }

  return {
    getPayload() {
      return GOOGLE_AUTH_USER_DATA;
    },
  };
};

// This is sample data returned about a Google User
const GOOGLE_AUTH_USER_DATA = {
  iss: 'https://accounts.google.com',
  azp: '',
  aud: '',
  sub: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a6', // make sure there is a user in MongoDB with the same exact authID
  email: 'test@gmail.com',
  email_verified: true,
  at_hash: '',
  nonce: '',
  name: 'Test Person',
  picture: '',
  given_name: 'Test',
  family_name: 'Person',
  locale: 'en',
  iat: 0,
  exp: 0,
};
