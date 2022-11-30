module.exports.POST_COMPLETE_LESSON = {
  lesson_id: '62391a30487d5ae343c8231c',
  course_id: '62391a30487d5ae343c82311',
  unit_id: '62391a30487d5ae343c82312',
};

module.exports.POST_INVALID_LESSON = {
  lesson_id: '72391a30487d5ae343c8231c',
  course_id: '62391a30487d5ae343c82311',
  unit_id: '62391a30487d5ae343c82312',
};

module.exports.POST_MISSING_LESSON = {
  course_id: '62391a30487d5ae343c82311',
  unit_id: '62391a30487d5ae343c82312',
};

module.exports.POST_LESSON_INVALID_COURSE = {
  lesson_id: '62391a30487d5ae343c8231c',
  course_id: 'abc',
  unit_id: '62391a30487d5ae343c82312',
};

module.exports.POST_LESSON_NONEXISTING_COURSE = {
  lesson_id: '62391a30487d5ae343c8231c',
  course_id: '72391a30487d5ae343c82311',
  unit_id: '62391a30487d5ae343c82312',
};
