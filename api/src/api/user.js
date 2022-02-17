const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js')

router.post(
  '/users',
  errorWrap(async (req, res) => {
    const userInfo = req.body;
    const newUser = new models.User({
      role: userInfo.role,
      authID: userInfo.authID,
      adminLanguages: userInfo.adminLanguages,
      learnerLanguages: userInfo.learnerLanguages,
      collaboratorLanguages: userInfo.collaboratorLanguages
    });
    await newUser.save();
    return sendResponse(
      res,
      200,
      'Successfully created a new user',
      newUser,
    );
  }),
);

//testing only!
router.get(
  '/users',
  errorWrap(async (req, res) => {
    const successMessage =
      "u did a get c:";
    return sendResponse(
      res,
      200,
      'Successfully returned success message',
      successMessage,
    );
  }),
);

module.exports = router;