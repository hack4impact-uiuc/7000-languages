const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { requireAuthentication } = require('../../middleware/authentication');
const mongoose = require('mongoose');
const { updateDocumentsInTransaction } = require('../../utils/languageHelper');
const { models } = require('../../models/index.js');

// Add all endpoints that start with 'language/unit/...' here

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
