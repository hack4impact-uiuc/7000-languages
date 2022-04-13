const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { requireAuthentication } = require('../../middleware/authentication');
const _ = require('lodash');
const { ERR_NO_COURSE_DETAILS } = require('../../utils/constants');
const { checkIds } = require('../../utils/languageHelper');

/**
 * Does a patch update a single course in the database, meaning
 * it makes changes to parts of the course specified in the request.
 */
router.patch(
  '/:id',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const updates = req.body;

    const course_id = req.params.id;

    // Checks if the ids are valid
    const isValid = await checkIds({ course_id });

    if (!isValid) {
      return sendResponse(res, 404, 'Course not found');
    }

    const course = await models.Course.findById(req.params.id);

    for (var key in updates) {
      if (key in course && typeof course[key] === typeof updates[key]) {
        course[key] = updates[key];
      }
    }

    await course.save();
    return sendResponse(res, 200, 'Successfully updated course', course);
  }),
);

/**
 * Creates a new course in the database
 */
router.post(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const user = req.user;
    const courseData = req.body;
    if (!courseData.details) {
      return sendResponse(res, 404, ERR_NO_COURSE_DETAILS);
    }
    const newCourse = new models.Course({
      approved: true,
      admin_id: user.authID,
      details: courseData.details,
    });

    await newCourse.save();
    let newResult = newCourse.toJSON();
    newResult = _.omit(newResult, ['admin_id']);

    await models.User.updateOne(
      { _id: user._id },
      { $push: { adminLanguages: newCourse._id } },
    );

    return sendResponse(
      res,
      200,
      'Successfully created a new course',
      newResult,
    );
  }),
);

module.exports = router;
