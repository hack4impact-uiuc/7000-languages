const { ROLE_ENUM } = require('../../src/utils/constants.js');

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
    population: 8750,
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
    population: 8750,
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
    population: 8750,
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
    population: 8750,
    link: "https://tepid-toll.com"
  }
};

module.exports.PUT_UPDATE_INVALID_FIELD = {
  invalid: "should do nothing"
};

module.exports.PUT_UPDATE_NON_BOOLEAN_APPROVAL = {
  approved: "should do nothing"
};
