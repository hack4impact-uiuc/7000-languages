const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { requireAuthentication } = require('../../middleware/authentication');
const {
  requireLanguageAuthorization,
} = require('../../middleware/authorization');
const mongoose = require('mongoose');
const {
  updateDocumentsInTransaction,
  getNumUnitsInCourse,
} = require('../../utils/languageHelper');
const { models } = require('../../models/index.js');
const _ = require('lodash');
/**
 * Fetches specified unit in the database
 */
router.get(
  '/',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const { unit_id } = req.query;

    let unit = await models.Unit.findOne({ _id: unit_id });
    unit = unit.toJSON();

    let lessons = await models.Lesson.find({ _unit_id: unit_id });
    for (var i = 0; i < lessons.length; i++) {
      const numVocab = lessons[i].vocab.length;
      lessons[i] = lessons[i].toJSON();
      lessons[i] = _.omit(lessons[i], ['vocab']);
      lessons[i].num_vocab = numVocab;
    }
    const returnedData = {
      unit: unit,
      lessons: lessons,
    };
    return sendResponse(res, 200, 'Successfully fetched course', returnedData);
  }),
);

router.post(
  '/',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const unitData = req.body;

    if (unitData.name === '' || unitData.description === '') {
      return sendResponse(
        res,
        400,
        'You are missing a unit name and/or description. Please try again.',
      );
    }

    const course_id = unitData.course_id;

    const order = await getNumUnitsInCourse(course_id);

    const newUnit = new models.Unit({
      _course_id: course_id,
      name: unitData.name,
      _order: order,
      selected: unitData.selected,
      description: unitData.description,
    });

    await newUnit.save();
    let newResult = newUnit.toJSON();
    newResult.num_lessons = 0;

    return sendResponse(res, 200, 'Successfully created a new unit', newResult);
  }),
);

/**
 * Updates multiple lessons in a unit at once with a a Mongoose transaction (an execution of many operations
 * (insert, update or delete) as a single unit that takes the database from a consistent state and lets it to a consistent one).
 * If the lessons are invalid or missing data, we roll back the changes and return 400.
 *
 * Source: https://blog.tericcabrel.com/how-to-use-mongodb-transaction-in-node-js/
 */
router.put(
  '/',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    let unitData = [];
    const unitUpdates = req.body.updates;

    try {
      unitData = await updateDocumentsInTransaction(
        models.Unit,
        unitUpdates,
        session,
      );
      // Commit the changes
      await session.commitTransaction();
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();
      return sendResponse(res, 400, `Could not update units: ${error}`);
    }
    // Ending the session
    session.endSession();
    return sendResponse(res, 200, 'Updated units with success', unitData);
  }),
);

module.exports = router;
