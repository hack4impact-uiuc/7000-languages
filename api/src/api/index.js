const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json('API working!'));
// Put all routes here
router.use('/user', require('./user'));
router.use('/language', require('./language'));

module.exports = router;
