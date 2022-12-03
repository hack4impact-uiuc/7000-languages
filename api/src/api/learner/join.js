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
const { isPartOfCourse } = require('../../utils/learnerHelper');

/**
 * Marks the user as having completed a specific lesson
 */
router.post(
  '/',
  requireAuthentication,
  requireLearnerAuthorization,
  errorWrap(async (req, res) => {
    const { course_id, code } = req.body;

    if (course_id === undefined) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    const isValid = await checkIds({ course_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    const isAlreadyPartOfCourse = await isPartOfCourse(
      req.user._id, 
      course_id,
    );

    if (isAlreadyPartOfCourse) {
      return sendResponse(
        res,
        400,
        'User has already joined course',
      );
    }

    const course = await models.Course.findById(course_id);
    const private = course.details.is_private;
    const courseCode = course.details.code;
    if(private && courseCode !== code)
    {
      return sendResponse(
        res,
        400,
        'Invalid code provided for private course',
      );
    }

    const user = models.User.findById(req.user._id);
    user.learnerLanguages.push(course_id);

    user.save();

    return sendResponse(
      res,
      200,
      'Added course to user\'s learner languages',
    );
  }),
);

module.exports = router;
