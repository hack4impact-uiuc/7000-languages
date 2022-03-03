const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');
const { ROLE_ENUM } = require('../utils/constants.js');

/**
 * Creates a new user in the database
 *
 * @param {newUser} New user
 * @returns a new user with their role set as user by default
 * authID, and admin, learner, and collaborator languages set to
 * an empty array
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

module.exports = router;