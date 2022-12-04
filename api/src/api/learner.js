const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');
const { requireAuthentication } = require('../middleware/authentication');
const _ = require('lodash');
const { getCoursesByUser } = require('../utils/userHelper');

router.get(
  '/search',
  requireAuthentication,
  errorWrap(async (req, res) => {

    const { search, field } = req.query;
    // field = field ?? field : ;
    const userData = await models.Course.aggregate([
      {
        $name: { $search: search } 
      },
      // { $sort: { name: 1 } }
    ]);

    console.log(userData);
    console.log('AAAAAAAAAAAAAA')
    const pipeline = _.omit(userData, ['authID'], ['approved']);
    // console.log(pipeline.searchData);

    pipeline.searchData = await getCoursesByUser(
      pipeline.searchData,
    );

    //search then sort
    return sendResponse(res, 200, 'Successfully updated course', pipeline);
  }),
);

module.exports = router;  