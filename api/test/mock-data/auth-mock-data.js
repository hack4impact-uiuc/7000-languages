const { DEFAULT_ID_TOKEN, DEFAULT_AUTH_ID } = require('../utils/constants');

/* 
This function mocks the return value of the verifyIdToken() method of 
the OAuth2Client class, which is part of google-auth-library.
for more details on the function, visit: https://github.com/googleapis/google-auth-library-nodejs/blob/main/src/auth/oauth2client.ts 
*/
module.exports.verifyIdTokenMockReturnValue = (data) => {
  const userData = GOOGLE_AUTH_USER_DATA;
  if (data.idToken !== DEFAULT_ID_TOKEN) {
    userData.sub = data.idToken;
  } else {
    userData.sub = DEFAULT_AUTH_ID;
  }

  return {
    getPayload() {
      return userData;
    },
  };
};

// This is sample data returned about a Google User
const GOOGLE_AUTH_USER_DATA = {
  iss: 'https://accounts.google.com',
  azp: '',
  aud: '',
  sub: DEFAULT_AUTH_ID, // matches the authID of the first user in api/test/db-data/users.json
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
