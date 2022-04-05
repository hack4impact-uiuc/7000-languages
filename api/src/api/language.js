const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');
const { requireAuthentication } = require('../middleware/authentication');
const _ = require('lodash');
const { ERR_NO_COURSE_DETAILS } = require('../utils/constants');
const { Course, Unit } = require('../models/language');

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

// const returnedData = {
//   course: Course, //remove admin_id
//   units: [unit1, unit2, unit3]
// }

// const unit1 = {
//   _course_id: { type: String, required: true, index: true },
//   name: { type: String, required: true },
//   _order: { type: Number, required: true, index: true },
//   selected: { type: Boolean, required: true },
//   description: { type: String, required: true, default: '' },
//   numLessons: 10
// }

router.get(
  '/course/:id',
  //requireAuthentication,
  errorWrap(async (req, res) => {
    const course = await Course.findOne({ _id: req.params.id });
    console.log(course);
    const units = await Unit.find({ _course_id: req.params.id });
    //cannot use forEach loop, use for loop
    for (var i = 0; i < units.length; i++) {
      const numLessons = await Unit.find({ _unit_id: units[i]._id }).count();
      //append numLessons to each unit JSON
      //$push: { adminLanguages: newCourse._id }
      units[i].addProperty('num_lessons', numLessons);
    }
    // units.forEach(unit => {
    //   const numLessons = await Unit.find({ _unit_id: unit._id }).count();
    //   //append numLessons to each unit JSON
    //   //$push: { adminLanguages: newCourse._id }
    //   unit.addProperty("num_lessons", numLessons);
    // });
    const newCourse = _.omit(course, ['admin_id']);
    const returnedData = {
      course: newCourse, //remove admin_id
      units: units,
    };
    return sendResponse(res, 200, 'Successfully fetched course', returnedData);
  }),
);

module.exports = router;
