const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js')

router.post(
  '/',
  errorWrap(async (req, res) => {
    const userInfo = req.body;
    const newUser = new models.User(userInfo);
    await newUser.save();
    return sendResponse(
      res,
      200,
      'Successfully created a new user',
      newUser,
    );
  }),
);

module.exports = router;