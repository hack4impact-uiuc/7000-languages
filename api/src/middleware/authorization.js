const { ERR_AUTH_FAILED, ERR_NOT_AUTHORIZED } = require('../utils/constants');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');

const requireLanguageAuthorization = async (req, res, next) => {
  var current_language =
    req.body._course_id ||
    req.body.course_id ||
    req.query.course_id ||
    req.params.id ||
    req.params.course_id;

  if (!current_language) {
    return sendResponse(res, 403, ERR_AUTH_FAILED);
  }

  var ObjectId = require('mongoose').Types.ObjectId;
  if (!ObjectId.isValid(current_language)) {
    return sendResponse(res, 400, 'Invalid ObjectID');
  }
  try {
    /* Check if the course exists */
    const courseExists = await models.Course.findById(current_language);
    if (!courseExists) {
      return sendResponse(res, 404, 'Course does not exist');
    }

    /* Check if the user is an admin for this course */
    var authorized_languages = req.user.adminLanguages;

    let isAuthorized = false;

    for (let i = 0; i < authorized_languages.length; i++) {
      if (authorized_languages[i] === current_language) {
        isAuthorized = true;
        break;
      }
    }

    if (isAuthorized) {
      const course = await models.Course.findById(current_language);
      if (course.admin_id !== req.user.authID) {
        // Course doesn't contain the admin id, so we discredit the user as an admin of this course
        isAuthorized = false;
      } else {
        req.user.isLearner = false;
        // Authorized admin
        return next();
      }
    }

    /* 
      Check if the user is a learner for this course if the user isn't an admin
      and it is a GET request
    */
    if (!isAuthorized && 'GET' === req.method) {
      var authorized_learner_languages = req.user.learnerLanguages;
      for (let i = 0; i < authorized_learner_languages.length; i++) {
        if (authorized_learner_languages[i] === current_language) {
          req.user.isLearner = true;
          isAuthorized = true;
          break;
        }
      }
    }

    if (!isAuthorized) {
      return sendResponse(res, 403, ERR_NOT_AUTHORIZED);
    }

    return next();
  } catch (error) {
    console.error(
      'requireLanguageAuthorization(): error caught: ',
      error.message,
    );
    return sendResponse(res, 403, ERR_AUTH_FAILED);
  }
};

const requireLearnerAuthorization = async (req, res, next) => {
  var current_language =
    req.body._course_id ||
    req.body.course_id ||
    req.query.course_id ||
    req.params.id ||
    req.params.course_id;

  if (!current_language) {
    return sendResponse(res, 403, ERR_AUTH_FAILED);
  }

  var ObjectId = require('mongoose').Types.ObjectId;
  if (!ObjectId.isValid(current_language)) {
    return sendResponse(res, 400, 'Invalid ObjectID');
  }
  try {
    /* Check if the course exists */
    const courseExists = await models.Course.findById(current_language);
    if (!courseExists) {
      return sendResponse(res, 404, 'Course does not exist');
    }

    let isAuthorized = false;

    /* 
      Check if the user is a learner for this course
    */
    var authorized_learner_languages = req.user.learnerLanguages;
    for (let i = 0; i < authorized_learner_languages.length; i++) {
      if (authorized_learner_languages[i] === current_language) {
        req.user.isLearner = true;
        isAuthorized = true;
        break;
      }
    }

    if (!isAuthorized) {
      return sendResponse(res, 403, ERR_NOT_AUTHORIZED);
    }

    return next();
  } catch (error) {
    console.error(
      'requireLanguageAuthorization(): error caught: ',
      error.message,
    );
    return sendResponse(res, 403, ERR_AUTH_FAILED);
  }
};

module.exports = {
  requireLanguageAuthorization,
  requireLearnerAuthorization,
};
