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


module.exports.PUT_ORIGINAL_COURSE = {
  approved: true,
  admin_id: "ba32cb26-2020-4fbc-b77d-34ea6b0790a6",
  details: {
    name: "vero",
    alternative_name: "architecto",
    admin_name: "Miss Priscilla Nienow",
    admin_email: "Rodolfo64@gmail.com",
    description: "Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.",
    translated_language: "English",
    location: "North America",
    iso: "en",
    glotto: "stan1293",
    population: "8750",
    link: "https://tepid-toll.com"
  }
};

module.exports.PUT_EXPECTED_COURSE_UPDATED_APPROVAL = {
  approved: false,
  admin_id: "ba32cb26-2020-4fbc-b77d-34ea6b0790a6",
  details: {
    name: "vero",
    alternative_name: "architecto",
    admin_name: "Miss Priscilla Nienow",
    admin_email: "Rodolfo64@gmail.com",
    description: "Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.",
    translated_language: "English",
    location: "North America",
    iso: "en",
    glotto: "stan1293",
    population: "8750",
    link: "https://tepid-toll.com"
  }
}

module.exports.PUT_EXPECTED_COURSE_UPDATED_ADMIN_ID = {
  approved: true,
  admin_id: "ba32cb26-2020-4fbc-b77d-34ea6b0790a7",
  details: {
    name: "vero",
    alternative_name: "architecto",
    admin_name: "Miss Priscilla Nienow",
    admin_email: "Rodolfo64@gmail.com",
    description: "Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.",
    translated_language: "English",
    location: "North America",
    iso: "en",
    glotto: "stan1293",
    population: "8750",
    link: "https://tepid-toll.com"
  }
}

module.exports.PUT_EXPECTED_COURSE_UPDATED_COURSE_DETAILS = {
  approved: true,
  admin_id: "ba32cb26-2020-4fbc-b77d-34ea6b0790a6",
  details: {
    name: "vero",
    alternative_name: "architecto",
    admin_name: "Miss Priscilla Nayonika",
    admin_email: "Rodolfo64@gmail.com",
    description: "Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.",
    translated_language: "English",
    location: "North America",
    iso: "en",
    glotto: "stan1293",
    population: "8750",
    link: "https://tepid-toll.com"
  }
}

module.exports.PUT_UPDATE_APPROVAL = {
  approved: false
};

module.exports.PUT_UPDATE_ADMIN_ID = {
  admin_id: "ba32cb26-2020-4fbc-b77d-34ea6b0790a7"
};

module.exports.PUT_UPDATE_COURSE_DETAILS = {
  details: {
    name: "vero",
    alternative_name: "architecto",
    admin_name: "Miss Priscilla Nayonika",
    admin_email: "Rodolfo64@gmail.com",
    description: "Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.",
    translated_language: "English",
    location: "North America",
    iso: "en",
    glotto: "stan1293",
    population: "8750",
    link: "https://tepid-toll.com"
  }
};

module.exports.PUT_UPDATE_INVALID_FIELD = {
  invalid: "should do nothing"
};

module.exports.PUT_UPDATE_NON_BOOLEAN_APPROVAL = {
  approved: "should do nothing"
};
