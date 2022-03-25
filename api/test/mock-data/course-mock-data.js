module.exports.POST_SIMPLE_COURSE = {
  approved: true,
  details: {
    admin_name: 'Jessica Singh',
    admin_email: 'jess@123.com',
    name: 'Learning 101',
    alternative_name: '',
    description: 'hii',
    iso: '',
    glotto: '',
    translated_language: 'English',
    population: '',
    location: 'Michigan',
    link: '',
  },
};

module.exports.POST_SIMPLE_COURSE_EXPECTED = {
  approved: true,
  details: {
    admin_name: 'Jessica Singh',
    admin_email: 'jess@123.com',
    name: 'Learning 101',
    alternative_name: '',
    description: 'hii',
    iso: '',
    glotto: '',
    translated_language: 'English',
    population: '',
    location: 'Michigan',
    link: '',
  },
};

module.exports.POST_MISSING_NON_REQ_FIELD_COURSE = {
  approved: true,
  details: {
    admin_name: 'Jessica Singh',
    admin_email: 'jess@123.com',
    name: 'Learning 101',
    description: 'hii',
    translated_language: 'English',
    location: 'Michigan',
  },
};

module.exports.POST_MISSING_NON_REQ_FIELD_COURSE_EXPECTED = {
  approved: true,
  details: {
    admin_name: 'Jessica Singh',
    admin_email: 'jess@123.com',
    name: 'Learning 101',
    alternative_name: '',
    description: 'hii',
    iso: '',
    glotto: '',
    translated_language: 'English',
    population: '',
    location: 'Michigan',
    link: '',
  },
};

module.exports.POST_WRONG_COURSE_MISSING_NAME = {
  approved: true,
  details: {
    admin_name: 'Jessica Singh',
    admin_email: 'jess@123.com',
    description: 'hii',
    translated_language: 'English',
    location: 'Michigan',
  },
};

module.exports.POST_COURSE_ADDITIONAL_FIELDS = {
  approved: true,
  details: {
    admin_name: 'Jessica Singh',
    admin_email: 'jess@123.com',
    name: 'Learning 101',
    alternative_name: '',
    description: 'hii',
    iso: '',
    glotto: '',
    translated_language: 'English',
    population: '',
    location: 'Michigan',
    link: '',
    extraDetails: '',
  },
};

module.exports.POST_COURSE_ADDITIONAL_FIELDS_EXPECTED = this.POST_SIMPLE_COURSE;
