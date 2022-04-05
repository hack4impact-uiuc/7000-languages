module.exports.POST_FIRST_VOCAB_ITEM = {
  lesson_id: '62391a30487d5ae343c8231c',
  course_id: '62391a30487d5ae343c82311',
  unit_id: '62391a30487d5ae343c82312',
  vocab: {
    original: 'Hello',
    translation: 'Hola',
  },
};

module.exports.POST_FIRST_VOCAB_ITEM_EXPECTED = {
  _order: 15,
  original: 'Hello',
  translation: 'Hola',
};

module.exports.POST_SECOND_VOCAB_ITEM = {
  lesson_id: '62391a30487d5ae343c8231c',
  course_id: '62391a30487d5ae343c82311',
  unit_id: '62391a30487d5ae343c82312',
  vocab: {
    original: 'Morning',
    translation: 'Manana',
  },
};

module.exports.POST_SECOND_VOCAB_ITEM_EXPECTED = {
  _order: 16,
  original: 'Morning',
  translation: 'Manana',
};

module.exports.POST_DETAILED_VOCAB_ITEM = {
  lesson_id: '62391a30487d5ae343c8231c',
  course_id: '62391a30487d5ae343c82311',
  unit_id: '62391a30487d5ae343c82312',
  vocab: {
    original: 'Hello',
    translation: 'Hola',
    audio: 'some AWS Link',
    image: 'some AWS Link',
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
  notes:
    'Minus illo maiores ut laborum vitae soluta eaque est. Numquam atque nostrum rem in aspernatur debitis. Quis aut omnis optio nisi non consequatur autem quod quisquam. Sunt laboriosam quae sapiente ea doloremque.',
};

module.exports.POST_VOCAB_ITEM_MISSING_REQUIRED_FIELDS = {
  lesson_id: '62391a30487d5ae343c8231c',
  course_id: '62391a30487d5ae343c82311',
  unit_id: '62391a30487d5ae343c82312',
  vocab: {},
};

module.exports.POST_VOCAB_ITEM_EXTRA_FIELDS = {
  lesson_id: '62391a30487d5ae343c8231c',
  course_id: '62391a30487d5ae343c82311',
  unit_id: '62391a30487d5ae343c82312',
  vocab: {
    original: 'Hello',
    translation: 'Hola',
    randomField: 1312312,
    randomFieldTwo: false,
  },
};

module.exports.POST_VOCAB_ITEM_MISSING_ID = {
  lesson_id: '62391a30487d5ae343c8231c',
  unit_id: '62391a30487d5ae343c82312',
  vocab: {
    original: 'Hello',
    translation: 'Hola',
  },
};

module.exports.POST_VOCAB_ITEM_INVALID_ID = {
  lesson_id: '12345a30487d5ae343c8231c',
  course_id: '62391a30487d5ae343c82311',
  unit_id: '62391a30487d5ae343c82312',
  vocab: {
    original: 'Hello',
    translation: 'Hola',
  },
};
