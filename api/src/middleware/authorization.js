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
    const courseExists = await models.Course.findById(current_language);
    if (!courseExists) {
      return sendResponse(res, 404, 'Course does not exist');
    }
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
      return sendResponse(res, 403, ERR_NOT_AUTHORIZED);
    }
    //check if course contains admin id of user
    const course = await models.Course.findById(current_language);
    if (course.admin_id !== req.user.authID) {
      return sendResponse(res, 403, ERR_NOT_AUTHORIZED);
    }
    next();
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
};
