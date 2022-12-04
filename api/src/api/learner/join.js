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
    console.log("1");
    if (course_id === undefined) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }
    console.log("2");
    const isValid = await checkIds({ course_id });
    console.log("3");
    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }
    console.log("4");
    const isAlreadyPartOfCourse = await isPartOfCourse(
      req.user._id, 
      course_id,
    );
    console.log("5")
    if (isAlreadyPartOfCourse) {
      return sendResponse(
        res,
        400,
        'User has already joined course',
      );
    }

    const course = await models.Course.findById(course_id);
    const isPrivate = course.details.is_private;
    const courseCode = course.details.code;
    if(isPrivate && courseCode !== code)
    {
      return sendResponse(
        res,
        400,
        'Invalid code provided for private course',
      );
    }
    console.log("before");
    const user = models.User.findById(req.user._id);
    console.log(user);
    console.log(user.learnerLanguages);
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
