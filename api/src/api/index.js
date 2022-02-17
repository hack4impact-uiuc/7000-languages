const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json('API working!'));
// Put all routes here
router.use('/home', require('./home'));
router.use('/user', require('./user'));

module.exports = router;
