const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');

router.post(
    '/',
    errorWrap(async (req, res) => {
        const userInfo = req.body;
        console.error(userInfo)
        const newUser = new models.User({
            ...userInfo,
            role: 1,
        });
        await newUser.save();
        return sendResponse(res, 200, 'Successfully created a new user', newUser);
    }),
);

//testing only!
router.get(
    '/',
    errorWrap(async (req, res) => {
        const users = await models.User.find();
        return sendResponse(res, 200, 'Successfully returned users', users);
    }),
);

module.exports = router;