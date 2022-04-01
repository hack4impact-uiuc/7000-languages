const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');
const { requireAuthentication } = require('../middleware/authentication');
const _ = require('lodash');
const { ERR_NO_COURSE_DETAILS } = require('../utils/constants');
const { deleteAssociatedUnits, deleteAssociatedLessons } = require('../utils/languageHelper');

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

router.delete(
  '/course/:id',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const deleteCount = await models.Course.deleteOne({ _id: req.params.id });
    deleteCount['deletedCount'] = ('deletedCount' in deleteCount) ? deleteCount['deletedCount'] : -1;
      
    if (deleteCount['deletedCount'] === 1) {
      await deleteAssociatedUnits(req.params.id);
      await deleteAssociatedLessons(req.params.id);
      return sendResponse(res, 200, 'Successfully deleted course and associated units + lessons');
    } else if (deleteCount['deletedCount'] === -1) {
      return sendResponse(res, 500, 'Deletion field');
    } else {
      return sendResponse(res, 404, 'Course not found');
    }
  }),
);

module.exports = router;
