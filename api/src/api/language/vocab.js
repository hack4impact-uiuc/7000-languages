const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { requireAuthentication } = require('../../middleware/authentication');
const { ERR_MISSING_OR_INVALID_DATA } = require('../../utils/constants');

/**
 * Creates a new vocab item in a lesson
 */
router.post(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const { course_id, unit_id, lesson_id, vocab } = req.body;
    if (!course_id || !unit_id || !lesson_id || !vocab) {
      return sendResponse(res, 404, ERR_MISSING_OR_INVALID_DATA);
    }

    try {
      const lessonData = await models.Lesson.findOne({
        _course_id: course_id,
        _unit_id: unit_id,
        _id: lesson_id,
      });
      if (lessonData === null) {
        return sendResponse(res, 404, ERR_MISSING_OR_INVALID_DATA);
      }
      vocab._order = lessonData.vocab.length;
      lessonData.vocab.push(vocab);
      await lessonData.save();

      return sendResponse(
        res,
        200,
        'Successfully created a new vocab item',
        vocab,
      );
    } catch (error) {
      console.error('POST /vocab/: ', error.message);
      return sendResponse(res, 404, ERR_MISSING_OR_INVALID_DATA);
    }
  }),
);

module.exports = router;
