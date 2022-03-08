const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/language.js');
const { requireAuthentication } = require('../middleware/authentication');
const _ = require('lodash');
/**
 * Creates a new course in the database
 *
 * @param {newUser} New course
 * @returns a new course under the given language
 */
router.post(
  '/language/course',
  requireAuthentication,
  // const user = req.user;
  // user.authID

  // const newCourse = new models.Course(someCourseData)
  // await newCourse.save();
  errorWrap(async (req, res) => {
    const user = req.user;

    const newCourse = new models.Course({
      approved: true,
      admin_id: user.authID,
      details: {
        name: req.body.name,
        description: req.body.description,
        translated_language: req.body.translated_language,
        location: req.body.location,
        iso: req.body.iso,
      },
    });

    user.adminLanguages.push(newCourse._id);

    await newCourse.save();
    let newResult = newCourse.toJSON();
    newResult = _.omit(newResult, ['admin_id']);
    return sendResponse(
      res,
      200,
      'Successfully created a new course',
      newResult,
    );
  }),
);

module.exports = router;
