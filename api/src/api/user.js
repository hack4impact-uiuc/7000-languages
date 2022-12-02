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
const {
  ERR_IMPROPER_ID_TOKEN,
  SUCCESS_GETTING_USER_DATA,
  ERR_GETTING_USER_DATA,
} = require('../utils/constants');
const { getCoursesByUser } = require('../utils/userHelper');

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
      return sendResponse(res, 400, ERR_IMPROPER_ID_TOKEN);
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
    const userData = req.user;

    // if for some reason, there is no user data to work with
    if (!userData) {
      return sendResponse(res, 400, ERR_GETTING_USER_DATA);
    }

    const dataToReturn = _.omit(userData, ['authID']);

    // reformats the data related to the courses that the user belongs to

    dataToReturn.adminLanguages = await getCoursesByUser(
      dataToReturn.adminLanguages,
    );
    dataToReturn.learnerLanguages = await getCoursesByUser(
      dataToReturn.learnerLanguages,
    );
    dataToReturn.collaboratorLanguages = await getCoursesByUser(
      dataToReturn.collaboratorLanguages,
    );

    return sendResponse(res, 200, SUCCESS_GETTING_USER_DATA, dataToReturn);
  }),
);

module.exports = router;
