const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { requireAuthentication } = require('../../middleware/authentication');
const { models } = require('../../models/index.js');
const { ERR_MISSING_OR_INVALID_DATA } = require('../../utils/constants');
const { checkIds } = require('../../utils/languageHelper');

/**
 * Joins user in course with course_id
 */
router.post(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const { course_id, code } = req.body;

    if (course_id === undefined) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    const isValid = await checkIds({ course_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    const learnerLanguages = req.user.learnerLanguages;

    if (learnerLanguages.includes(String(course_id))) {
      return sendResponse(res, 400, 'User has already joined course');
    }

    const course = await models.Course.findById(course_id);
    const isPrivate = course.details.is_private;
    const courseCode = course.details.code;

    if (isPrivate && courseCode !== code) {
      return sendResponse(res, 400, 'Invalid code provided for private course');
    }

    const user = await models.User.findById(req.user._id);

    user.learnerLanguages.push(course_id);
    user.save();

    return sendResponse(res, 200, "Added course to user's learner languages");
  }),
);

/**
 * Removes user from course
 */
router.post(
  '/remove',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const { course_id } = req.body;

    if (course_id === undefined) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    const isValid = await checkIds({ course_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    const learnerLanguages = req.user.learnerLanguages;

    if (!learnerLanguages.includes(String(course_id))) {
      return sendResponse(res, 400, 'User not in course');
    }

    const user = await models.User.findById(req.user._id);

    user.learnerLanguages = user.learnerLanguages.filter(
      (id) => id !== course_id,
    );
    user.save();

    return sendResponse(
      res,
      200,
      "Removed course from user's learner languages",
    );
  }),
);

module.exports = router;
