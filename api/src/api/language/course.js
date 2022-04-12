const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { requireAuthentication } = require('../../middleware/authentication');
const _ = require('lodash');
const { ERR_NO_COURSE_DETAILS } = require('../../utils/constants');

/**
 * Does a patch update a single course in the database, meaning
 * it makes changes to parts of the course specified in the request.
 */
router.patch(
  '/:id',
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

/**
 * Fetches specified course in the database
 */
router.get(
  '/:id',
  requireAuthentication,
  errorWrap(async (req, res) => {
    let course = await models.Course.findOne({ _id: req.params.id });
    course = course.toJSON();
    let units = await models.Unit.find({ _course_id: req.params.id });
    for (var i = 0; i < units.length; i++) {
      const numLessons = await models.Lesson.countDocuments({
        _unit_id: { $eq: units[i]._id },
      });
      units[i] = units[i].toJSON();
      units[i].num_lessons = numLessons;
      console.log(units[i]);
    }
    let newCourse = _.omit(course, ['admin_id']);
    console.log(newCourse);
    const returnedData = {
      course: newCourse,
      units: units,
    };
    return sendResponse(res, 200, 'Successfully fetched course', returnedData);
  }),
);

module.exports = router;
