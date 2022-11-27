const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { requireAuthentication } = require('../../middleware/authentication');
const {
  requireLearnerAuthorization,
} = require('../../middleware/authorization');
const { models } = require('../../models/index.js');
const { ERR_MISSING_OR_INVALID_DATA } = require('../../utils/constants');
const { checkIds } = require('../../utils/languageHelper');

/**
 * Marks the user as having completed a specific lesson
 */
router.post(
  '/',
  requireAuthentication,
  requireLearnerAuthorization,
  errorWrap(async (req, res) => {
    const { course_id, unit_id, lesson_id } = req.body;

    // Checks if the ids are valid
    const isValid = await checkIds({ course_id, unit_id, lesson_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    const lessonComplete = new models.Complete({
      user_id: req.user._id,
      _course_id: course_id,
      _unit_id: unit_id,
      _lesson_id: lesson_id,
    });

    await lessonComplete.save();

    return sendResponse(
      res,
      200,
      'Marked the user as having completed the lesson.',
    );
  }),
);

module.exports = router;
