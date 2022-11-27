const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>
  res.json(`API Working, running ${process.env.NODE_ENV}`),
);
// Put all routes here
router.use('/user', require('./user'));
router.use('/language', require('./language'));
router.use('/learner', require('./learner'));

module.exports = router;
