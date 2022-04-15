const { ERR_AUTH_FAILED, ERR_NOT_AUTHORIZED } = require('../utils/constants');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');

const requireLanguageAuthorization = async (req, res, next) => {
  var current_language = '';
  if (req.body.course_id) {
    current_language = req.body.course_id;
  } else if (req.query.course_id) {
    current_language = req.query.course_id;
  } else if (req.params.id) {
    current_language = req.params.id;
  } else {
    return sendResponse(res, 401, ERR_AUTH_FAILED);
  }
  var ObjectId = require('mongoose').Types.ObjectId;
  if (!ObjectId.isValid(current_language)) {
    next();
    return;
  }
  const courseExists = await models.Course.findById(current_language);
  if (!courseExists) {
    next();
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
        console.log("2")
      return sendResponse(res, 401, ERR_NOT_AUTHORIZED);
    }
    //check if course contains admin id of user
    const course = await models.Course.findById(current_language);
    if (course.admin_id !== req.user.authID) {
        console.log("3")
      return sendResponse(res, 401, ERR_NOT_AUTHORIZED);
    }
    next();
  } catch (error) {
    console.log("4")
    return sendResponse(res, 401, ERR_AUTH_FAILED);
  }
};

module.exports = {
  requireLanguageAuthorization,
};
