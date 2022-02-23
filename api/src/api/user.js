const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');

/**
 * POST endpoint for new user
 *
 * @param {newUser} New user
 * @returns 200 success or error message
 */
router.post(
  '/',
  errorWrap(async (req, res) => {
    const userInfo = req.body;
    const newUser = new models.User({
      role: ROLE_ENUM.USER,
      authID: userInfo.authID,
      adminLanguages: [],
      learnerLanguages: [],
      collaboratorLanguages: [],
    });
    await newUser.save();
    return sendResponse(res, 200, 'Successfully created a new user', newUser);
  }),
);

//testing only!
/**
 * GET endpoint for all users
 *
 * @param {newUser} none
 * @returns 200 success or error message
 */
router.get(
  '/',
  errorWrap(async (req, res) => {
    const users = await models.User.find();
    return sendResponse(res, 200, 'Successfully returned users', users);
  }),
);

module.exports = router;
