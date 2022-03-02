module.exports.POST_SIMPLE_USER = {
  role: ROLE_ENUM.USER,
  authID: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
};

module.exports.POST_SIMPLE_USER_EXPECTED = {
  role: ROLE_ENUM.USER,
  authID: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
};

module.exports.POST_WRONG_USER_NO_AUTH_ID = {
  role: ROLE_ENUM.USER,
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
};

module.exports.POST_USER_ADMIN = {
  role: ROLE_ENUM.ADMIN,
  authID: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
};

module.exports.POST_USER_ADDITIONAL_FIELDS = {
  role: ROLE_ENUM.USER,
  authID: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
  randomLanguages: [],
};

module.exports.POST_WRONG_USER_NO_ROLE = {
  authID: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
};

module.exports.POST_USER_ONE_LESS_FIELD = {
  role: ROLE_ENUM.USER,
  authID: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
  adminLanguages: [],
  learnerLanguages: [],
};
