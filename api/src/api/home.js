const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');

router.get(
  '/',
  errorWrap(async (req, res) => {
    const singleHome =
      "You've connected the database! Isn't it so beautiful???";
    return sendResponse(
      res,
      200,
      'Successfully returned home text',
      singleHome,
    );
  }),
);

module.exports = router;
