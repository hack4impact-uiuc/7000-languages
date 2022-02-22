const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json('API working!'));
// Put all routes here

module.exports = router;
