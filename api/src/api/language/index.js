const express = require('express');
const router = express.Router();

// Put all routes here
router.use('/course', require('./course'));
router.use('/unit', require('./unit'));
router.use('/lesson', require('./lesson'));
router.use('/vocab', require('./vocab'));

module.exports = router;
