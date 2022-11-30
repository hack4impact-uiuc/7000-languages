module.exports.POST_BERBER_COURSE = {
  approved: true,
  details: {
    admin_name: 'Jamie Rollison',
    admin_email: 'email@123.com',
    name: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
    alternative_name: 'ⵜⵎⵣⵗⵜ',
    description:
      'ⵒⵤⴰⵣⴻⵔⵜⵢⵓⵉⵄⵃⵯⵇⵙⴷⴼⴳⵀⵊⴽⵍⵎⵑⵡⵅⵛⵖⴱⵏⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠⵈⵚⴹⴵⴳⵯⵁⵋⴽⵯⴸⴺⴾⵆⴿⴴⴲⵐ are all the characters i think',
    iso: '',
    glotto: '',
    translated_language: 'Français',
    population: '',
    location: 'Algeria',
    link: '',
  },
};

module.exports.POST_BERBER_COURSE_EXPECTED = {
  approved: true,
  details: {
    admin_name: 'Jamie Rollison',
    admin_email: 'email@123.com',
    name: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
    alternative_name: 'ⵜⵎⵣⵗⵜ',
    description:
      'ⵒⵤⴰⵣⴻⵔⵜⵢⵓⵉⵄⵃⵯⵇⵙⴷⴼⴳⵀⵊⴽⵍⵎⵑⵡⵅⵛⵖⴱⵏⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠⵈⵚⴹⴵⴳⵯⵁⵋⴽⵯⴸⴺⴾⵆⴿⴴⴲⵐ are all the characters i think',
    iso: '',
    glotto: '',
    translated_language: 'Français',
    population: '',
    location: 'Algeria',
    is_private: true,
    link: '',
  },
};

module.exports.POST_BERBER_UNIT = {
  _course_id: '62391a30487d5ae343c82311',
  name: 'ⵒⵤⴰⵣⴻⵔⵜⵢⵓⵉⵄⵃⵯⵇⵙⴷⴼⴳⵀⵊⴽⵍⵎⵑⵡⵅⵛⵖⴱⵏⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠⵈⵚⴹⴵⴳⵯⵁⵋⴽⵯⴸⴺⴾⵆⴿⴴⴲⵐ',
  selected: true,
  description:
    'ⵒⵤⴰⵣⴻ ⵔⵜⵢⵓⵉⵄⵃⵯⵇⵙⴷⴼⴳⵀⵊⴽⵍ ⵎⵑⵡⵅⵛⵖⴱⵏⴶⵥⵗⵕⵟⵂⵌⵘⵝ ⵞⵠⵈⵚⴹⴵⴳⵯⵁⵋⴽⵯⴸ ⴺⴾⵆⴿⴴⴲⵐ',
};

module.exports.POST_BERBER_UNIT_EXPECTED = {
  _course_id: '62391a30487d5ae343c82311',
  _order: 10,
  name: 'ⵒⵤⴰⵣⴻⵔⵜⵢⵓⵉⵄⵃⵯⵇⵙⴷⴼⴳⵀⵊⴽⵍⵎⵑⵡⵅⵛⵖⴱⵏⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠⵈⵚⴹⴵⴳⵯⵁⵋⴽⵯⴸⴺⴾⵆⴿⴴⴲⵐ',
  selected: true,
  description:
    'ⵒⵤⴰⵣⴻ ⵔⵜⵢⵓⵉⵄⵃⵯⵇⵙⴷⴼⴳⵀⵊⴽⵍ ⵎⵑⵡⵅⵛⵖⴱⵏⴶⵥⵗⵕⵟⵂⵌⵘⵝ ⵞⵠⵈⵚⴹⴵⴳⵯⵁⵋⴽⵯⴸ ⴺⴾⵆⴿⴴⴲⵐ',
  num_lessons: 0,
};

module.exports.POST_BERBER_LESSON = {
  unit_id: '62391a30487d5ae343c82312',
  course_id: '62391a30487d5ae343c82311',
  lesson: {
    name: 'ⵃⵯⵇⵙⴷⴼⴳⵀⵊ',
    selected: true,
    description: 'ⵒⵤⴰⵣⴻⵔⵜⵢⵓⵉⵄⵃⵯⵇⵙⴷⴼⴳⵀⵊⴽⵍⵎⵑⵡⵅⵛⵖⴱⵏⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠⵈⵚⴹⴵⴳⵯⵁⵋⴽⵯⴸⴺⴾⵆⴿⴴⴲⵐ',
  },
};

module.exports.POST_BERBER_LESSON_EXPECTED = {
  name: 'ⵃⵯⵇⵙⴷⴼⴳⵀⵊ',
  selected: true,
  _order: 5,
  _unit_id: '62391a30487d5ae343c82312',
  _course_id: '62391a30487d5ae343c82311',
  vocab: [],
  description: 'ⵒⵤⴰⵣⴻⵔⵜⵢⵓⵉⵄⵃⵯⵇⵙⴷⴼⴳⵀⵊⴽⵍⵎⵑⵡⵅⵛⵖⴱⵏⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠⵈⵚⴹⴵⴳⵯⵁⵋⴽⵯⴸⴺⴾⵆⴿⴴⴲⵐ',
};

module.exports.POST_BERBER_VOCAB_ITEM = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab: {
    original: 'Berber',
    translation: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
  },
};

module.exports.POST_BERBER_VOCAB_ITEM_EXPECTED = {
  _order: 15,
  original: 'Berber',
  translation: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
  audio: '',
  image: '',
  notes: '',
  selected: true,
};

module.exports.POST_BERBER_DETAILED_VOCAB_ITEM = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab: {
    original: 'Another word',
    translation: 'ⵯⵇⵙⴷⴼⴳⵀⵊ',
    audio: 'some AWS Link',
    image: 'some AWS Link',
    notes:
      'ⵒⵤⴰⵣⴻⵔⵜⵢⵓⵉⵄⵃⵯⵇⵙⴷⴼⴳⵀⵊⴽⵍⵎⵑⵡⵅⵛⵖⴱⵏⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠⵈⵚⴹⴵⴳⵯⵁⵋⴽⵯⴸⴺⴾⵆⴿⴴⴲⵐ is a set of all the characters',
  },
};

module.exports.PATCH_BERBER_COURSE = {
  approved: true,
  details: {
    admin_name: 'Jamie Rollison',
    admin_email: 'email@123.com',
    name: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
    alternative_name: 'ⵜⵎⵣⵗⵜ',
    description:
      'ⵒⵤⴰⵣⴻⵔⵜⵢⵓⵉⵄⵃⵯⵇⵙⴷⴼⴳⵀⵊⴽⵍⵎⵑⵡⵅⵛⵖⴱⵏⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠⵈⵚⴹⴵⴳⵯⵁⵋⴽⵯⴸⴺⴾⵆⴿⴴⴲⵐ is an updated description',
    iso: '',
    glotto: '',
    translated_language: 'Français',
    population: '',
    location: 'Algeria',
    link: '',
  },
};

module.exports.PATCH_BERBER_COURSE_EXPECTED = {
  approved: true,
  admin_id: 'ba32cb26-2020-4fbc-b77d-34ea6b0790a6',
  details: {
    admin_name: 'Jamie Rollison',
    admin_email: 'email@123.com',
    name: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
    alternative_name: 'ⵜⵎⵣⵗⵜ',
    description:
      'ⵒⵤⴰⵣⴻⵔⵜⵢⵓⵉⵄⵃⵯⵇⵙⴷⴼⴳⵀⵊⴽⵍⵎⵑⵡⵅⵛⵖⴱⵏⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠⵈⵚⴹⴵⴳⵯⵁⵋⴽⵯⴸⴺⴾⵆⴿⴴⴲⵐ is an updated description',
    iso: '',
    glotto: '',
    translated_language: 'Français',
    population: '',
    location: 'Algeria',
    link: '',
    is_private: true,
  },
};

module.exports.PATCH_BERBER_UNIT = {
  _course_id: '62391a30487d5ae343c82311',
  name: 'ⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠⵈⵚⴹ!',
};

module.exports.PATCH_BERBER_UNIT_EXPECTED = {
  _course_id: '62391a30487d5ae343c82311',
  _order: 10,
  name: 'ⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠⵈⵚⴹ!',
  selected: true,
  description:
    'ⵒⵤⴰⵣⴻ ⵔⵜⵢⵓⵉⵄⵃⵯⵇⵙⴷⴼⴳⵀⵊⴽⵍ ⵎⵑⵡⵅⵛⵖⴱⵏⴶⵥⵗⵕⵟⵂⵌⵘⵝ ⵞⵠⵈⵚⴹⴵⴳⵯⵁⵋⴽⵯⴸ ⴺⴾⵆⴿⴴⴲⵐ',
  num_lessons: 0,
};

module.exports.PATCH_BERBER_LESSON_DESCRIPTION = {
  lesson_id: '62391a30487d5ae343c8231c',
  course_id: '62391a30487d5ae343c82311',
  unit_id: '62391a30487d5ae343c82312',
  updates: {
    description: 'ⵞⵠⵈⵚⴹⴵⴳⵯⵁ',
  },
};

module.exports.PATCH_BERBER_LESSON_DESCRIPTION_EXPECTED = {
  // we'll just check the description
  lesson_id: '62391a30487d5ae343c8231c',
  course_id: '62391a30487d5ae343c82311',
  unit_id: '62391a30487d5ae343c82312',
  description: 'ⵞⵠⵈⵚⴹⴵⴳⵯⵁ',
};
