const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');
const { requireAuthentication } = require('../middleware/authentication');
const _ = require('lodash');
const {
  ERR_NO_COURSE_DETAILS,
  ERR_MISSING_OR_INVALID_DATA,
} = require('../utils/constants');

/**
 * patch
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
 *
 * @param {newUser} New course
 * @returns a new course under the given language
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

/**
 * Creates a new vocab item in a lesson
 */
router.post(
  '/vocab',
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
