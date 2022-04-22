const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { requireAuthentication } = require('../../middleware/authentication');
const _ = require('lodash');

// Add all endpoints that start with 'language/unit/...' here
/**
 * Fetches specified unit in the database
 */
router.get(
  '/:id',
  requireAuthentication,
  errorWrap(async (req, res) => {
    let unit = await models.Unit.findOne({ _id: req.params.id });
    unit = unit.toJSON();

    let lessons = await models.Lesson.find({ _unit_id: req.params.id });
    for (var i = 0; i < lessons.length; i++) {
      const numVocab = lessons[i].vocab.length;
      lessons[i] = lessons[i].toJSON();
      lessons[i] = _.omit(lessons[i], ['vocab']);
      lessons[i].num_vocab = numVocab;
    }
    //let newCourse = _.omit(course, ['admin_id']);
    const returnedData = {
      unit: unit,
      lessons: lessons,
    };
    return sendResponse(res, 200, 'Successfully fetched course', returnedData);
  }),
);

module.exports = router;
