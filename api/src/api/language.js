const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');

router.delete(
  '/:id',
  errorWrap(async (req, res) => {
    await models.Course.deleteOne({_id: req.params.id});
    return sendResponse(res, 200, 'Successfully deleted course', course);
  }),
);

module.exports = router;

