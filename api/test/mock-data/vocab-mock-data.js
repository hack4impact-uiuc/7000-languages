module.exports.PATCH_VOCAB_ITEM = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab_id: '62391a30487d5ae343c8231d',
  vocab_update: {
    original: 'Yeet',
    translation: 'This is a translation',
    notes: 'New test',
  },
};

module.exports.PATCH_VOCAB_SECOND_ITEM = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab_id: '62391a30487d5ae343c82322',
  vocab_update: {
    notes:
      'Deleniti quidem corporis eius. Accusamus est sed enim. Doloribus voluptas perspiciatis. Consequuntur et necessitatibus occaecati aspernatur debitis doloremque quos necessitatibus.',
  },
};

module.exports.PATCH_VOCAB_ITEM_EXPECTED = {
  _id: '62391a30487d5ae343c8231d',
  _order: 0,
  original: 'Yeet',
  translation: 'This is a translation',
  image: ';1BU*FsGAg',
  audio: '_jQ`dG/6"r',
  selected: true,
  notes: 'New test',
};

(module.exports.PATCH_VOCAB_SECOND_ITEM_EXPECTED = {
  _id: '62391a30487d5ae343c82322',
  _order: 5,
  original: 'vitae',
  translation: 'et',
  image: 'f>AOAZ2,d{',
  audio: '<]N}3}!ai*',
  selected: true,
  notes:
    'Deleniti quidem corporis eius. Accusamus est sed enim. Doloribus voluptas perspiciatis. Consequuntur et necessitatibus occaecati aspernatur debitis doloremque quos necessitatibus.',
}),
  (module.exports.PATCH_VOCAB_ITEM_EXTRA_FIELDS = {
    course_id: '62391a30487d5ae343c82311',
    lesson_id: '62391a30487d5ae343c8231c',
    vocab_id: '62391a30487d5ae343c8231e',
    vocab_update: {
      original: 'original',
      translation: 'This is a translation',
      field1: 'extra field',
      field2: 'extra field 2',
      image: 'new aws image link',
      audio: 'new aws audio link',
    },
  });

module.exports.PATCH_VOCAB_ITEM_EXTRA_FIELDS_EXPECTED = {
  _id: '62391a30487d5ae343c8231e',
  _order: 1,
  original: 'original',
  translation: 'This is a translation',
  image: 'new aws image link',
  audio: 'new aws audio link',
  selected: true,
  notes:
    'Unde optio modi. Reiciendis dolorem atque. Et hic quia et qui error et sint libero et. Sapiente eum voluptatem beatae consequatur ut rerum similique. Eligendi qui aut velit. Voluptatem quisquam ipsa quas.',
};

module.exports.PATCH_VOCAB_ITEM_MISSING_ID = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab_update: {
    original: 'Yeet',
    translation: 'This is a translation',
    notes: 'New test',
  },
};

module.exports.PATCH_VOCAB_ITEM_INVALID_ID = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab_id: 'abcd1a30487d5ae343c8231d',
  vocab_update: {
    original: 'Yeet',
    translation: 'This is a translation',
    notes: 'New test',
  },
};

module.exports.PATCH_VOCAB_ITEM_MISSING_VOCAB = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab_id: 'abcd1a30487d5ae343c8231d',
};

module.exports.PATCH_VOCAB_ITEM_INVALID_VOCAB = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab_id: '62391a30487d5ae343c8231d',
  vocab_update: {
    test: 12341,
    boolean: [1, 2, undefined, false],
    subDocument: {
      a: null,
      b: true,
      c: {
        d: 'e',
        e: 'f',
      },
    },
  },
};

module.exports.PATCH_VOCAB_ITEM_INVALID_VOCAB_EXPECTED = {
  _id: '62391a30487d5ae343c8231d',
  _order: 0,
  original: 'aut',
  translation: 'provident',
  image: ';1BU*FsGAg',
  audio: '_jQ`dG/6"r',
  selected: true,
  notes:
    'Illum repudiandae autem impedit omnis quaerat impedit ab. Harum sit quo autem expedita. Deleniti fugiat nulla. Et ipsam temporibus sit architecto. Atque ut mollitia dolorem.',
};

module.exports.POST_FIRST_VOCAB_ITEM = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab: {
    original: 'Hello',
    translation: 'Hola',
  },
};

module.exports.POST_FIRST_VOCAB_ITEM_EXPECTED = {
  _order: 15,
  original: 'Hello',
  translation: 'Hola',
  audio: '',
  image: '',
  selected: true,
  notes: '',
};

module.exports.POST_SECOND_VOCAB_ITEM = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab: {
    original: 'Morning',
    translation: 'Manana',
  },
};

module.exports.POST_SECOND_VOCAB_ITEM_EXPECTED = {
  _order: 16,
  original: 'Morning',
  translation: 'Manana',
  audio: '',
  image: '',
  selected: true,
  notes: '',
};

module.exports.POST_DETAILED_VOCAB_ITEM = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab: {
    original: 'Hello',
    translation: 'Hola',
    audio: 'some AWS Link',
    image: 'some AWS Link',
    selected: true,
    notes:
      'Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.',
  },
};

module.exports.POST_DETAILED_VOCAB_ITEM_EXPECTED = {
  _order: 15,
  original: 'Hello',
  translation: 'Hola',
  audio: 'some AWS Link',
  image: 'some AWS Link',
  selected: true,
  notes:
    'Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.',
};

module.exports.POST_VOCAB_ITEM_MISSING_REQUIRED_FIELDS = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab: {},
};

module.exports.POST_VOCAB_ITEM_EXTRA_FIELDS = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '62391a30487d5ae343c8231c',
  vocab: {
    original: 'Hello',
    translation: 'Hola',
    randomField: 1312312,
    randomFieldTwo: false,
  },
};

module.exports.POST_VOCAB_ITEM_MISSING_ID = {
  course_id: '62391a30487d5ae343c82311',
  vocab: {
    original: 'Hello',
    translation: 'Hola',
  },
};

module.exports.POST_VOCAB_ITEM_INVALID_ID = {
  course_id: '62391a30487d5ae343c82311',
  lesson_id: '12345a30487d5ae343c8231c',
  vocab: {
    original: 'Hello',
    translation: 'Hola',
  },
};
