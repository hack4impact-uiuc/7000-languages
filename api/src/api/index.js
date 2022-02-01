const express = require('express');
const router = express.Router();

// Put all routes here
router.use('/home', require('./home'));

module.exports = router;
