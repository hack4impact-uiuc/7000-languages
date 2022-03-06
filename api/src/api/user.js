const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');
const { ROLE_ENUM } = require('../utils/constants.js');
const {
  requireAuthentication,
  getUserByIDToken,
} = require('../middleware/authentication');
const _ = require('lodash');

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
    const userData = await getUserByIDToken(userInfo.idToken);

    if (!userData || !userData.sub) {
      return sendResponse(res, 400, 'Missing or improper idToken');
    }
    const userAuthID = userData.sub;

    const userExists = await models.User.findOne({ authID: userAuthID });
    if (userExists) {
      let result = userExists;
      result = _.omit(result, ['authID']);
      return sendResponse(
        res,
        202,
        'User with this authID already exists',
        result,
      );
    }
    const newUser = new models.User({
      role: ROLE_ENUM.USER,
      authID: userAuthID,
      adminLanguages: [],
      learnerLanguages: [],
      collaboratorLanguages: [],
    });
    await newUser.save();
    let newResult = newUser.toJSON();
    newResult = _.omit(newResult, ['authID']);
    return sendResponse(res, 200, 'Successfully created a new user', newResult);
  }),
);

router.get(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    sendResponse(res, 200, 'test data', `test data from api${Math.random()}`);
  }),
);

module.exports = router;
