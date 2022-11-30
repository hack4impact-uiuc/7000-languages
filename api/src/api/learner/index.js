const express = require('express');
const router = express.Router();

// Put all routes here
router.use('/complete', require('./complete'));
router.use('/join', require('./join'));

module.exports = router;
