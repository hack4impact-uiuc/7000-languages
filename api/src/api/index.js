const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json('API working!'));
router.post('/users', (req, res) => res.json('API working!!'));
router.get('/users', (req, res) => res.json('API working!!!'));
// Put all routes here
router.use('/home', require('./home'));

module.exports = router;
