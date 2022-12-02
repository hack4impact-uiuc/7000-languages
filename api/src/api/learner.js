const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { sendResponse } = require('../utils/response');
const { models } = require('../models/index.js');
const {requireAuthentication} = require('../middleware/authentication');

router.get(
    '/',
    requireAuthentication,
    errorWrap(async (req, res) => {
      const updates = req.body;
      const {search} = req.query;
      const userData = models.Course.aggregate([
        { $match: { name: search } },
        //{ $group: { _id: "$stars", count: { $sum: 1 } } },
        {$sort : { name : 1 } }
    ]);

    const pipeline = _.omit(userData, ['authID'],['approved'] );

    pipeline.searchData = await getCoursesByUser(
        pipeline.searchData,
      );

      //search then sort
      return sendResponse(res, 200, 'Successfully updated course', pipeline);
    }),
  );

  module.exports = router;