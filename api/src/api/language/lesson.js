const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { requireAuthentication } = require('../../middleware/authentication');
const {
  SUCCESS_GETTING_LESSON_DATA,
  ERR_GETTING_LESSON_DATA,
  ERR_MISSING_OR_INVALID_DATA,
} = require('../../utils/constants');
const mongoose = require('mongoose');
const { updateLessonsInTransaction } = require('../../utils/languageHelper');

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
  errorWrap(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    let lessonData = [];
    const lessonUpdates = req.body.updates;

    try {
      lessonData = await updateLessonsInTransaction(lessonUpdates, session);
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
 * Gets lesson data and corresponding vocab data (words, phrases, etc) for a specific lesson in a certain unit
 */
router.get(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const { lesson_id } = req.query;

    if (!lesson_id) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    let lesson;

    try {
      lesson = await models.Lesson.findById(lesson_id);
    } catch (error) {
      return sendResponse(res, 404, ERR_MISSING_OR_INVALID_DATA);
    }

    if (lesson) {
      // sorts vocab in order of _order
      lesson.vocab.sort((a, b) => a._order - b._order);

      return sendResponse(res, 200, SUCCESS_GETTING_LESSON_DATA, lesson);
    }
    return sendResponse(res, 404, ERR_GETTING_LESSON_DATA);
  }),
);

module.exports = router;
