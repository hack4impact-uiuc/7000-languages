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
    let allCourses = await models.Course.find(
      {},
      { _id: 0, admin_id: 0, approved: 0 },
    );

    // Return all of the courses
    return sendResponse(res, 200, 'Searched courses', allCourses);
  }),
);

module.exports = router;
