const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');
const { requireAuthentication } = require('../middleware/authentication');
const _ = require('lodash');
const {
  ERR_NO_COURSE_DETAILS,
  SUCCESS_GETTING_LESSON_DATA,
  ERR_GETTING_LESSON_DATA,
  ERR_MISSING_OR_INVALID_DATA,
} = require('../utils/constants');

/**
 * Does a patch update a single course in the database, meaning
 * it makes changes to parts of the course specified in the request.
 */
router.patch(
  '/course/:id',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const updates = req.body;

    await models.Course.exists({ _id: req.params.id }, function (err) {
      if (err) {
        return sendResponse(res, 404, 'Course not found');
      }
    });

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
  '/course',
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

// TODO: get lesson data as well
/**
 * Gets lesson data and corresponding vocab data (words, phrases, etc) for a specific lesson in a certain unit
 */
router.get(
  '/lesson',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const { unit_id, course_id, lesson_id } = req.query;

    if (!unit_id || !course_id || !lesson_id) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA, {});
    }

    let lesson;

    try {
      lesson = await models.Lesson.findOne({
        _id: lesson_id,
        _course_id: course_id,
        _unit_id: unit_id,
      });
    } catch (error) {
      return sendResponse(res, 404, ERR_MISSING_OR_INVALID_DATA, {});
    }

    if (lesson) {
      // sorts vocab in order of _order
      lesson.vocab.sort((a, b) => a._order - b._order);

      return sendResponse(res, 200, SUCCESS_GETTING_LESSON_DATA, lesson);
    }
    return sendResponse(res, 404, ERR_GETTING_LESSON_DATA, {});
  }),
);

module.exports = router;
