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
  SUCCESS_POSTING_LESSON_DATA,
} = require('../../utils/constants');
const { getNumLessonsInUnit, checkIds } = require('../../utils/languageHelper');

/**
 * Creates a new lesson with 0 vocab items in the database
 */
router.post(
  '/',
  requireAuthentication,
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
  errorWrap(async (req, res) => {
    const { unit_id, course_id, lesson_id } = req.query;

    if (!unit_id || !course_id || !lesson_id) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    // Checks if the ids are valid
    const isValid = await checkIds({ course_id, unit_id, lesson_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    let lesson = await models.Lesson.findOne({
      _id: lesson_id,
      _course_id: course_id,
      _unit_id: unit_id,
    });

    if (lesson) {
      // sorts vocab in order of _order
      lesson.vocab.sort((a, b) => a._order - b._order);
      return sendResponse(res, 200, SUCCESS_GETTING_LESSON_DATA, lesson);
    }
    return sendResponse(res, 404, ERR_GETTING_LESSON_DATA);
  }),
);

module.exports = router;
