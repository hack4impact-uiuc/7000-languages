const { models, isUniqueOrder } = require('../models');
const { NOT_FOUND_INDEX } = require('../utils/constants');

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
  return NOT_FOUND_INDEX;
};

const validateLesson = async (lesson, session) => {
  // Run synchronous tests
  const error = lesson.validateSync();
  if (error) {
    throw `Validation error: ${error}`;
  }

  // Run async test manually
  const isValid = await isUniqueOrder(
    {
      _order: lesson._order,
      _course_id: lesson._course_id,
      _unit_id: lesson._unit_id,
    },
    lesson._id,
    models.Lesson,
    session,
  );
  if (!isValid) {
    throw `Validation error: ${lesson._id} does not have unique _order`;
  }
};

const validateLessons = async (lessons, session) => {
  const validations = lessons.map(async (lesson) =>
    validateLesson(lesson, session),
  );
  await Promise.all(validations);
};

module.exports.updateLessonsInTransaction = async (updatedLessons, session) => {
  let lessonData = [];
  // Go through all of the step updates in the request body and apply them
  for (let lessonIdx = 0; lessonIdx < updatedLessons.length; lessonIdx++) {
    // eslint-disable-next-line max-len
    const updatedLesson = await updateLessonInTransaction(
      updatedLessons[lessonIdx],
      session,
    );
    lessonData.push(updatedLesson);
  }

  // Go through the updated models and check validation
  await validateLessons(lessonData, session);
  return lessonData;
};

const updateLessonInTransaction = async (stepBody, session) => {
  const lessonToEdit = await models.Lesson.findById(stepBody._id).session(
    session,
  );

  patchDocument(lessonToEdit, stepBody);
  await lessonToEdit.save({ session, validateBeforeSave: false });

  // Return the model so that we can do validation later
  return lessonToEdit;
};

/**
 * Replaces the fields in document with the matching fields in update
 * @param {Mongoose Document} document
 * @param {Object} update
 */
const patchDocument = (document, updates) => {
  for (var key in updates) {
    if (key in document && typeof document[key] === typeof updates[key]) {
      document[key] = updates[key];
    }
  }
};
module.exports.patchDocument = patchDocument;
