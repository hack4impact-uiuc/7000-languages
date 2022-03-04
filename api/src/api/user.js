const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');
const { ROLE_ENUM } = require('../utils/constants.js');
const { requireAuthentication } = require('../middleware/authentication');

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
    const exists = await models.User.exists({ authID: userInfo.authID });
    if (exists) {
      return sendResponse(res, 202, 'User with this authID already exists');
    }
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

router.get(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    console.log(req.user);
    sendResponse(res, 200, 'test data', `test data from api${Math.random()}`);
  }),
);

module.exports = router;
