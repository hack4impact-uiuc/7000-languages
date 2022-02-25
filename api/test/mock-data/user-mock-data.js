module.exports.POST_SIMPLE_USER = {
  role: 0,
  authID: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a6',
};

module.exports.POST_SIMPLE_USER_EXPECTED = {
  role: 0,
  authID: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a6',
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
};

module.exports.POST_WRONG_USER_NO_AUTH_ID = {
  role: 0,
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
};

module.exports.POST_WRONG_USER_ADMIN = {
  role: 1,
  authID: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a6',
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
};

module.exports.POST_WRONG_USER_ADDITIONAL_FIELDS = {
  role: 0,
  authID: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a6',
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
  randomLanguages: [],
};

module.exports.POST_WRONG_USER_NO_ROLE = {
  authID: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a6',
  adminLanguages: [],
  learnerLanguages: [],
  collaboratorLanguages: [],
};
