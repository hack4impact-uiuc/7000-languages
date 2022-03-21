const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');

router.delete(
  '/:id',
  errorWrap(async (req, res) => {
    deleteCount = await models.Course.deleteOne({_id: req.params.id});
    if (deleteCount == 1) {
      return sendResponse(res, 200, 'Successfully deleted course');
    } else {
      return sendResponse(res, 404, 'Course not found')
    }
  }),
);

module.exports = router;

