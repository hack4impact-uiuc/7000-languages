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

module.exports.GET_SIMPLE_COURSE_EXPECTED = {
  course: {
    _id: '62391a30487d5ae343c82311',
    approved: true,
    details: {
      _id: '62391a30487d5ae343c82312',
      name: 'vero',
      alternative_name: 'architecto',
      admin_name: 'Miss Priscilla Nienow',
      admin_email: 'Rodolfo64@gmail.com',
      description:
        'Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.',
      translated_language: 'English',
      location: 'North America',
      iso: 'en',
      glotto: 'stan1293',
      population: '8750',
      link: 'https://tepid-toll.com',
    },
  }, //remove admin_id
  units: [
    {
      _id: '62391a30487d5ae343c82312',
      _course_id: '62391a30487d5ae343c82311',
      name: 'ratione',
      _order: 0,
      selected: true,
      description:
        'Omnis quam pariatur quasi id aperiam reprehenderit. Accusantium sint sunt nihil id eveniet alias aut fuga ut. Quae amet qui vel doloremque doloremque. Est doloribus qui ea enim voluptas nemo voluptatibus qui. Labore sed explicabo tenetur repellendus odio odit quas. Aperiam accusantium et.',
      num_lessons: 5,
    },
    {
      _id: '62391a30487d5ae343c82313',
      _course_id: '62391a30487d5ae343c82311',
      name: 'est',
      _order: 1,
      selected: true,
      description:
        'Vel aperiam minima magnam hic pariatur. Rem neque culpa. Quae sit in. Magni enim illum architecto et labore quo ut accusamus.',
      num_lessons: 5,
    },
    {
      _id: '62391a30487d5ae343c82314',
      _course_id: '62391a30487d5ae343c82311',
      name: 'sed',
      _order: 2,
      selected: true,
      description:
        'Ut molestiae perferendis dolores vero sed. Enim rerum quod quis hic neque at aperiam in consequuntur. Voluptatum qui repudiandae voluptate fugit excepturi et dolorem aspernatur. Aut veritatis quia repudiandae libero expedita. Aut quia minima quia voluptas sed. Sint numquam tenetur.',
      num_lessons: 5,
    },
    {
      _id: '62391a30487d5ae343c82315',
      _course_id: '62391a30487d5ae343c82311',
      name: 'dolore',
      _order: 3,
      selected: true,
      description:
        'Qui sapiente dolorum quaerat rerum eaque. Ea quo id animi eligendi ab enim aperiam omnis pariatur. Doloremque illum id nulla sunt mollitia saepe natus amet. Dolores deleniti sunt reiciendis.',
      num_lessons: 5,
    },
    {
      _id: '62391a30487d5ae343c82316',
      _course_id: '62391a30487d5ae343c82311',
      name: 'occaecati',
      _order: 4,
      selected: true,
      description:
        'Et quis voluptas amet. Ut aut ut occaecati saepe et assumenda dolorem. Ipsam architecto aliquam. Aut iure sed vero dolorum nobis.',
      num_lessons: 5,
    },
    {
      _id: '62391a30487d5ae343c82317',
      _course_id: '62391a30487d5ae343c82311',
      name: 'placeat',
      _order: 5,
      selected: true,
      description:
        'Corporis iure consequatur sit. Eligendi qui ex voluptate repellat eos quia. Aut facere odio ipsum in modi quas non. Ullam voluptatibus est ipsam vel maiores.',
      num_lessons: 5,
    },
    {
      _id: '62391a30487d5ae343c82318',
      _course_id: '62391a30487d5ae343c82311',
      name: 'sapiente',
      _order: 6,
      selected: true,
      description:
        'Qui blanditiis et. Deserunt ad molestias veniam libero minus quo doloribus. Quia itaque voluptatem amet inventore nam enim et. Omnis ratione nihil adipisci enim est ut laborum. Ex odit natus aspernatur.',
      num_lessons: 5,
    },
    {
      _id: '62391a30487d5ae343c82319',
      _course_id: '62391a30487d5ae343c82311',
      name: 'ea',
      _order: 7,
      selected: true,
      description:
        'Et labore molestiae nam voluptatibus id ea nihil nulla. Voluptatibus eos molestiae. Est velit et dignissimos voluptatem voluptatibus sit voluptas. Quod quisquam est. Aut quo tenetur ullam dicta fuga voluptas.',
      num_lessons: 5,
    },
    {
      _id: '62391a30487d5ae343c8231a',
      _course_id: '62391a30487d5ae343c82311',
      name: 'architecto',
      _order: 8,
      selected: true,
      description:
        'Minima omnis ex. Non velit molestias amet eius labore temporibus quo cupiditate. Necessitatibus fugiat est tempore sequi ut.',
      num_lessons: 5,
    },
    {
      _id: '62391a30487d5ae343c8231b',
      _course_id: '62391a30487d5ae343c82311',
      name: 'rem',
      _order: 9,
      selected: true,
      description:
        'Et minus sed commodi molestiae doloremque hic dolore dignissimos. Pariatur est in labore nostrum nobis in eveniet error. Maiores libero accusamus iusto officia doloremque. Asperiores porro provident quia deserunt culpa. Delectus sint omnis id laboriosam. Et sed incidunt.',
      num_lessons: 5,
    },
  ],
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

module.exports.PATCH_ORIGINAL_COURSE = {
  approved: true,
  admin_id: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a6',
  details: {
    name: 'vero',
    alternative_name: 'architecto',
    admin_name: 'Miss Priscilla Nienow',
    admin_email: 'Rodolfo64@gmail.com',
    description:
      'Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.',
    translated_language: 'English',
    location: 'North America',
    iso: 'en',
    glotto: 'stan1293',
    population: '8750',
    link: 'https://tepid-toll.com',
  },
};

module.exports.PATCH_EXPECTED_COURSE_UPDATED_APPROVAL = {
  approved: false,
  admin_id: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a6',
  details: {
    name: 'vero',
    alternative_name: 'architecto',
    admin_name: 'Miss Priscilla Nienow',
    admin_email: 'Rodolfo64@gmail.com',
    description:
      'Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.',
    translated_language: 'English',
    location: 'North America',
    iso: 'en',
    glotto: 'stan1293',
    population: '8750',
    link: 'https://tepid-toll.com',
  },
};

module.exports.PATCH_EXPECTED_COURSE_UPDATED_ADMIN_ID = {
  approved: true,
  admin_id: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
  details: {
    name: 'vero',
    alternative_name: 'architecto',
    admin_name: 'Miss Priscilla Nienow',
    admin_email: 'Rodolfo64@gmail.com',
    description:
      'Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.',
    translated_language: 'English',
    location: 'North America',
    iso: 'en',
    glotto: 'stan1293',
    population: '8750',
    link: 'https://tepid-toll.com',
  },
};

module.exports.PATCH_EXPECTED_COURSE_UPDATED_COURSE_DETAILS = {
  approved: true,
  admin_id: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a6',
  details: {
    name: 'vero',
    alternative_name: 'architecto',
    admin_name: 'Miss Priscilla Nayonika',
    admin_email: 'Rodolfo64@gmail.com',
    description:
      'Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.',
    translated_language: 'English',
    location: 'North America',
    iso: 'en',
    glotto: 'stan1293',
    population: '8750',
    link: 'https://tepid-toll.com',
  },
};

module.exports.PATCH_UPDATE_APPROVAL = {
  approved: false,
};

module.exports.PATCH_UPDATE_ADMIN_ID = {
  admin_id: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a7',
};

module.exports.PATCH_UPDATE_COURSE_DETAILS = {
  details: {
    name: 'vero',
    alternative_name: 'architecto',
    admin_name: 'Miss Priscilla Nayonika',
    admin_email: 'Rodolfo64@gmail.com',
    description:
      'Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.',
    translated_language: 'English',
    location: 'North America',
    iso: 'en',
    glotto: 'stan1293',
    population: '8750',
    link: 'https://tepid-toll.com',
  },
};

module.exports.PATCH_UPDATE_INVALID_FIELD = {
  invalid: 'should do nothing',
};

module.exports.PATCH_UPDATE_NON_BOOLEAN_APPROVAL = {
  approved: 'should do nothing',
};
