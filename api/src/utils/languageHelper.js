const { models } = require('../models/index.js');
const { NOT_FOUND_INDEX } = require('../utils/constants');
const mongoose = require('mongoose');

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

/**
 * Determines the number of lessons in a unit
 * @param {String} courseId
 * @param {String} unitId
 * @returns Number
 */
module.exports.getNumLessonsInUnit = async (courseId, unitId) => {
  if (!courseId || !unitId) {
    return null;
  }
  const numUnits = await models.Lesson.countDocuments({
    _course_id: courseId,
    _unit_id: unitId,
  });
  return numUnits;
};

/**
 * Gets the index of a vocab item in a lesson
 * @param {*} vocabId the MongoDB _id of the vocab item that we are searching for
 * @param {*} lesson Lesson data, contains an array of vocab items
 * @returns Index of vocab item or -1 if vocab item not found
 */
module.exports.getVocabIndexByID = (vocabId, lesson) => {
  for (let i = 0; i < lesson.vocab.length; i++) {
    if (lesson.vocab[i]._id.toString() === vocabId) {
      return i;
    }
  }
  return NOT_FOUND_INDEX;
};

/* 
  The methods below determine if a _id for a course/unit is valid, 
  meaning that a document exists in the appropriate collection for that given _id. 
*/
module.exports.isValidCourseId = async (courseId) => {
  if (mongoose.isValidObjectId(courseId)) {
    const courseExists = await models.Course.exists({ _id: courseId });
    return courseExists;
  }
  return false;
};

module.exports.isValidUnitId = async (unitId) => {
  if (mongoose.isValidObjectId(unitId)) {
    const courseExists = await models.Unit.exists({ _id: unitId });
    return courseExists;
  }
  return false;
};
