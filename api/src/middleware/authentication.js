const {
    ERR_AUTH_FAILED,
    ERR_IMPROPER_ID_TOKEN
} = require('../utils/constants');
const { sendResponse } = require('../utils/response');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_ID)

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
        const user = await getUserFromRequest(req);
        if (!user) {
            sendResponse(res, 401, ERR_IMPROPER_ID_TOKEN);
        } else {
            req.user = user;
            next();
        }
    } catch (error) {
        console.error(error);
        sendResponse(res, 401, ERR_AUTH_FAILED);
    }
};

// TODO: Setup middleware for authorizing user/giving access to a specific course

const getUserByIDToken = async (idToken) => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: [process.env.IOS_CLIENT_ID, process.env.ANDROID_CLIENT_ID]
    });
    const data = ticket.getPayload();
    return data;
};

const getUserFromRequest = async (req) => {
    const authHeader = req?.headers?.authorization?.split(' ');
    if (authHeader?.length !== 2) return null;
    const idToken = authHeader[1];

    const user = await getUserByIDToken(idToken);
    return user;
};

