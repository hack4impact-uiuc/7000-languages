const { models } = require('../models/index.js');

/**
 * Determines the number of units in a course
 * @param {String} courseId
 * @returns Number
 */
module.exports.getNumUnitsInCourse = async (courseId) => {
  if (!courseId) {
    return null;
  }
  const numUnits = await models.Unit.countDocuments({ _course_id: courseId });
  return numUnits;
};

module.exports.getVocabIndexByID = (vocabId, lesson) => {
  for (let i = 0; i < lesson.vocab.length; i++) {
    if (lesson.vocab[i]._id.toString() === vocabId) {
      return i;
    }
  }
  // eslint-disable-next-line no-magic-numbers
  return -1;
};
