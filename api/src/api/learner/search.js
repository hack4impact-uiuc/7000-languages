const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { requireAuthentication } = require('../../middleware/authentication');

router.get(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    let allCourses = await models.Course.find({}, { admin_id: 0, approved: 0 });

    const unitPromise = [];

    const getNumUnits = async (course_id) => {
      const numUnits = await models.Unit.countDocuments({
        _course_id: { $eq: course_id },
        selected: { $eq: true },
      });

      return numUnits;
    };

    for (let course of allCourses) {
      unitPromise.push(getNumUnits(course._id));
    }

    const totalNumUnits = await Promise.all(unitPromise);

    for (let i = 0; i < allCourses.length; i++) {
      allCourses[i] = allCourses[i].toJSON();
      allCourses[i].numUnits = totalNumUnits[i];
    }

    // Return all of the courses
    return sendResponse(res, 200, 'Searched courses', allCourses);
  }),
);

module.exports = router;
