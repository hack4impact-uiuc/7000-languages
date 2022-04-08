const { ROLE_ENUM } = require('../../src/utils/constants.js');

module.exports.POST_SIMPLE_USER = {
  role: ROLE_ENUM.USER,
  idToken: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
};

module.exports.POST_SIMPLE_USER_EXPECTED = {
  role: ROLE_ENUM.USER,
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
};

module.exports.POST_WRONG_USER_NO_ID_TOKEN = {
  role: ROLE_ENUM.USER,
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
};

module.exports.POST_USER_ADMIN = {
  role: ROLE_ENUM.ADMIN,
  idToken: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
};

module.exports.POST_USER_ADDITIONAL_FIELDS = {
  role: ROLE_ENUM.USER,
  idToken: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
  randomLanguages: [],
};

module.exports.POST_WRONG_USER_NO_ROLE = {
  idToken: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
};

module.exports.POST_USER_ONE_LESS_FIELD = {
  role: ROLE_ENUM.USER,
  idToken: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
  adminLanguages: [],
  learnerLanguages: [],
};

module.exports.EXPECTED_GET_USER_DATA = {
  name: 'Test Person',
  locale: 'en',
  email: 'test@gmail.com',
  picture: '',
  given_name: 'Test',
  family_name: 'Person',
  role: 0,
  adminLanguages: [
    { name: 'vero', _id: '62391a30487d5ae343c82311', num_units: 10 },
    {
      name: 'Course with no units',
      _id: '62391a30487d5ae343c82312',
      num_units: 0,
    },
  ],
  learnerLanguages: [],
  collaboratorLanguages: [],
};
