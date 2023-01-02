const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { requireAuthentication } = require('../../middleware/authentication');
const {
  requireLanguageAuthorization,
} = require('../../middleware/authorization');
const {
  SUCCESS_GETTING_LESSON_DATA,
  ERR_MISSING_OR_INVALID_DATA,
  SUCCESS_PATCHING_LESSON_DATA,
  SUCCESS_POSTING_LESSON_DATA,
} = require('../../utils/constants');
const mongoose = require('mongoose');
const {
  updateDocumentsInTransaction,
  checkIds,
  getNumLessonsInUnit,
  patchDocument,
  deleteLesson,
} = require('../../utils/languageHelper');

/**
 * Updates multiple lessons in a unit at once with a a Mongoose transaction (an execution of many operations
 * (insert, update or delete) as a single unit that takes the database from a consistent state and lets it to a consistent one).
 * If the lessons are invalid or missing data, we roll back the changes and return 400.
 *
 * Source: https://blog.tericcabrel.com/how-to-use-mongodb-transaction-in-node-js/
 */
router.put(
  '/',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    let lessonData = [];
    const lessonUpdates = req.body.updates;

    try {
      lessonData = await updateDocumentsInTransaction(
        models.Lesson,
        lessonUpdates,
        session,
      );
      // Commit the changes
      await session.commitTransaction();
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();
      return sendResponse(res, 400, `Could not update lessons: ${error}`);
    }
    // Ending the session
    session.endSession();
    return sendResponse(res, 200, 'Updated lessons with success', lessonData);
  }),
);

/**
 * Creates a new lesson with 0 vocab items in the database
 */
router.post(
  '/',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const { course_id, unit_id, lesson } = req.body;

    // Checks if any required data is missing
    if (!course_id || !unit_id || !lesson) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    // Checks if the ids are valid
    const isValid = await checkIds({ course_id, unit_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    // Creates a new lesson
    const numLessons = await getNumLessonsInUnit(course_id, unit_id);

    lesson._order = numLessons;
    lesson.vocab = [];
    lesson._course_id = course_id;
    lesson._unit_id = unit_id;

    const newLesson = new models.Lesson(lesson);
    await newLesson.save();

    return sendResponse(res, 200, SUCCESS_POSTING_LESSON_DATA, newLesson);
  }),
);

/**
 * Gets lesson data and corresponding vocab data (words, phrases, etc) for a specific lesson in a certain unit
 */
router.get(
  '/',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const { lesson_id } = req.query;

    if (!lesson_id) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    // Checks if the ids are valid
    const isValid = await checkIds({ lesson_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    let lesson = await models.Lesson.findById(lesson_id);
    // sorts vocab in order of _order
    lesson.vocab.sort((a, b) => a._order - b._order);
    return sendResponse(res, 200, SUCCESS_GETTING_LESSON_DATA, lesson);
  }),
);

/**
 * Does a patch update on a single lesson in the database, meaning
 * it makes changes to parts of the lesson specified in the request.
 */
router.patch(
  '/',
  requireAuthentication,
  requireLanguageAuthorization,

  errorWrap(async (req, res) => {
    const { lesson_id, updates } = req.body;

    if (!lesson_id || !updates) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    // Checks if the ids are defined, valid ObjectIDs, and exist in MongoDB
    const isValid = await checkIds({ lesson_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    let lesson = await models.Lesson.findById(lesson_id);
    patchDocument(lesson, updates);
    await lesson.save();
    return sendResponse(res, 200, SUCCESS_PATCHING_LESSON_DATA, lesson);
  }),
);

router.delete(
  '/',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const { lesson_id } = req.query;

    if (!lesson_id) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }
    deleteLesson(lesson_id).then(({ success, message }) => {
      if (success) {
        return sendResponse(res, 200, message);
      }
      return sendResponse(res, 400, message);
    });
  }),
);

module.exports = router;
