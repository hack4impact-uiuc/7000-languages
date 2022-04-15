const { ERR_AUTH_FAILED, ERR_NOT_AUTHORIZED } = require('../utils/constants');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');

const requireLanguageAuthorization = async (req, res, next) => {
  var current_language = '';
  if (req.body.course_id) {
    current_language = req.body.course_id;
  } else if (req.query.id) {
    current_language = req.query.id;
  } else if (req.params.id) {
    current_language = req.params.id;
  } else {
    sendResponse(res, 401, ERR_AUTH_FAILED);
    return;
  }
  var ObjectId = require('mongoose').Types.ObjectId;
  if (!ObjectId.isValid(current_language)) {
    sendResponse(res, 404, 'Course not found');
    return;
  }
  const courseExists = await models.Course.findOne({ _id: current_language });
  if (!courseExists) {
    sendResponse(res, 404, 'Course not found');
    return;
  }
  try {
    //check if language is in user's adminLanguages field

    var authorized_languages = req.user.adminLanguages;
    var currentInAuthorized = false;
    for (let i = 0; i < authorized_languages.length; i++) {
      if (authorized_languages[i] === current_language) {
        currentInAuthorized = true;
        break;
      }
    }
    if (!currentInAuthorized) {
      sendResponse(res, 401, ERR_NOT_AUTHORIZED);
      return;
    }
    //check if course contains admin id of user
    const course = await models.Course.findById(current_language);
    if (course.admin_id !== req.user.authID) {
      sendResponse(res, 401, ERR_NOT_AUTHORIZED);
      return;
    }
    next();
  } catch (error) {
    sendResponse(res, 401, ERR_AUTH_FAILED);
  }
};

module.exports = {
  requireLanguageAuthorization,
};
