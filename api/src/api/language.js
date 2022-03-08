const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');
const { requireAuthentication } = require('../middleware/authentication');
const _ = require('lodash');
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
    const newCourse = new models.Course({
      approved: true,
      admin_id: user.authID,
      details: {
        name: req.body.details.name,
        description: req.body.details.description,
        translated_language: req.body.details.translated_language,
        location: req.body.details.location,
        iso: req.body.details.iso,
      },
    });

    await newCourse.save();
    let newResult = newCourse.toJSON();
    newResult = _.omit(newResult, ['admin_id']);

    await models.User.updateOne({ _id: user._id },
      { $push: {adminLanguages: newCourse._id} }
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
