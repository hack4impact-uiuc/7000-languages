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
  SUCCESS_PATCHING_LESSON_DATA
} = require('../../utils/constants');
const {
  checkIds,
  patchDocument
} = require('../../utils/languageHelper');

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

    let lesson;

    try {
      lesson = await models.Lesson.findOne({
        _id: lesson_id,
        _course_id: course_id,
        _unit_id: unit_id,
      });
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

/**
 * Does a patch update on a single lesson in the database, meaning
 * it makes changes to parts of the lesson specified in the request.
 */
router.patch(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const { unit_id, course_id, lesson_id, updates } = req.query;

    if (!unit_id || !course_id || !lesson_id || !updates) {
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
      patchDocument(lesson, updates);
      await lesson.save();
      return sendResponse(res, 200, SUCCESS_PATCHING_LESSON_DATA, lesson);
    }
    return sendResponse(res, 404, ERR_GETTING_LESSON_DATA);
  }),
);

module.exports = router;
