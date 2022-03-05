const {
  ERR_AUTH_FAILED,
  ERR_IMPROPER_ID_TOKEN,
  ERR_NO_MONGO_DOCUMENT,
} = require('../utils/constants');
const { sendResponse } = require('../utils/response');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const { models } = require('../models/index.js');

/**
 * Middleware requires the incoming request to be authenticated, meaning that they have previously
 * logged in with their Google Account. Note, we are not checking if a user has access to a specific course.
 *
 * If not authenticated, a response
 * is sent back to the client, and the middleware chain is stopped. Authentication is done through
 * the 'authentication' HTTP header, which should be of the format 'Bearer <ACCESS_TOKEN>'. If
 * successful, the user's data is attachted to req.user before calling the next function.
 */
module.exports.requireAuthentication = async (req, res, next) => {
  try {
    // Validate user using Google Auth ID Token
    const user = await getUserFromRequest(req);
    if (!user) {
      sendResponse(res, 401, ERR_IMPROPER_ID_TOKEN);
    } else {
      // Checks if user exists in MongoDB
      const userInMongo = await models.User.findOne({ authID: user.sub }); // user.sub returns the user's Google Account unique ID
      if (userInMongo) {
        const userData = {
          name: user.name,
          locale: user.locale,
          email: user.email,
          picture: user.picture,
          given_name: user.given_name,
          family_name: user.family_name,
        };
        const mergedUserData = Object.assign(userData, userInMongo.toJSON());
        req.user = mergedUserData;
        next();
      } else {
        sendResponse(res, 401, ERR_NO_MONGO_DOCUMENT);
      }
    }
  } catch (error) {
    console.error(error);
    sendResponse(res, 401, ERR_AUTH_FAILED);
  }
};

// TODO: Setup middleware for authorizing user/giving access to a specific course

/**
 * Valides a user with their Google Auth ID Token
 * @param {String} idToken Google Auth ID Token (JWT)
 * @returns Google User Data
 */
module.exports.getUserByIDToken = async (idToken) => {
  if (idToken) {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: [process.env.IOS_CLIENT_ID, process.env.ANDROID_CLIENT_ID],
    });
    const data = ticket.getPayload();
    return data;
  }
  return null;
};

/**
 * Gets user data using a JWT stored in the request header
 * @param {*} req request data
 * @returns user data
 */
const getUserFromRequest = async (req) => {
  const authHeader = req?.headers?.authorization?.split(' ');
  if (authHeader?.length !== 2) {
    return null;
  }
  const idToken = authHeader[1];

  const user = await getUserByIDToken(idToken);
  return user;
};
