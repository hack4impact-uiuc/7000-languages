const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');

const { models } = require('../models');

router.get(
  '/',
  errorWrap(async (req, res) => {
    const singleHome = await models.Home.findOne();
    return sendResponse(
      res,
      200,
      'Successfully returned home text',
      singleHome,
    );
  }),
);

module.exports = router;
