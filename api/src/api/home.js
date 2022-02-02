const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');

// uncomment to use the schema
// const Home = require('../models/home');

router.get(
  '/',
  errorWrap(async (req, res) => {
    // MongoDB connection
    // const homeText = await Home.findOne();
    const homeText = "You've connected the database! Isn't it so beautiful???";

    return sendResponse(res, 200, 'Successfully returned home text', homeText);
  }),
);

module.exports = router;
