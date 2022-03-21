const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');
const {
  requireAuthentication,
  getUserByIDToken,
} = require('../middleware/authentication');

/**
 * put
 */

 router.put(
    '/:id',
    errorWrap(async (req, res) => {
      const updates = req.body;
      const course = await models.Course.findOne({_id: req.params.id});
      if (updates.approved == true) {
        course.approved = true;
      }
      if (updates.approved == false) {
        course.approved = false;
      }
      if (updates.admin_id) {
        course.admin_id = updates.admin_id;
      }
      if (updates.details) {
        course.details = updates.details;
      }
      await course.save();
      return sendResponse(res, 200, 'Successfully updated course', course);
    }),
  );

module.exports = router;