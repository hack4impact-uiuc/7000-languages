const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { requireAuthentication } = require('../../middleware/authentication');
const {
  requireLanguageAuthorization,
} = require('../../middleware/authorization');
const {
  ERR_MISSING_OR_INVALID_DATA,
  SUCCESS_POSTING_VOCAB_DATA,
  NOT_FOUND_INDEX,
} = require('../../utils/constants');
const { getVocabIndexByID, checkIds } = require('../../utils/languageHelper');

/**
 * Updates the fields for a vocab item
 */
router.patch(
  '/',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const { lesson_id, vocab_id, vocab_update } = req.body;

    if (!lesson_id || !vocab_id || !vocab_update) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    // Checks if the ids are valid
    const isValid = await checkIds({ lesson_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    /* Get the lesson data from MongoDB */
    let lesson = await models.Lesson.findById(lesson_id);

    /* Obtain the index of the vocab item that we want to update */
    const vocabIndex = getVocabIndexByID(vocab_id, lesson);

    if (vocabIndex === NOT_FOUND_INDEX) {
      return sendResponse(res, 404, 'Vocab item not found');
    }

    /* Using the index, apply changes to the lesson data */
    let vocabData = lesson.vocab[vocabIndex];

    for (var key in vocab_update) {
      if (
        key in vocabData &&
        typeof vocabData[key] === typeof vocab_update[key]
      ) {
        vocabData[key] = vocab_update[key];
      }
    }

    await lesson.save();
    return sendResponse(res, 200, 'Successfully updated vocab item', vocabData);
  }),
);

/**
 * Creates a new vocab item in a lesson
 */
router.post(
  '/',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const { lesson_id, vocab } = req.body;
    if (!lesson_id || !vocab) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    // Checks if the ids are valid
    const isValid = await checkIds({ lesson_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    // Obtain the lesson mongoose document
    const lessonData = await models.Lesson.findById(lesson_id);

    try {
      // Give the new vocab item an order value and push to lesson mongoose document
      vocab._order = lessonData.vocab.length;
      lessonData.vocab.push(vocab);
      await lessonData.save();

      return sendResponse(
        res,
        200,
        SUCCESS_POSTING_VOCAB_DATA,
        lessonData.vocab[lessonData.vocab.length - 1],
      );
    } catch (error) {
      return sendResponse(res, 404, ERR_MISSING_OR_INVALID_DATA);
    }
  }),
);

/**
 * Updates the fields for multiple vocab items
 */
 router.put(
  '/',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const { lesson_id, vocab_updates } = req.body;
    if (!lesson_id || !vocab_updates) {
      return sendResponse(res, 400, "this data is missing or invalid");
    }

    // Checks if the ids are valid
    const isValid = await checkIds({ lesson_id });

    if (!isValid) {
      return sendResponse(res, 400, "the data is fucked");
    }

    /* Get the lesson data from MongoDB */
    let lesson = await models.Lesson.findById(lesson_id);

    for (let i = 0; i < vocab_updates.length; i++) {
      /* Obtain the index of the vocab item that we want to update */
      const vocabIndex = getVocabIndexByID(vocab_updates[i]._id, lesson);

      if (vocabIndex === NOT_FOUND_INDEX) {
        return sendResponse(res, 404, 'Vocab item not found');
      }

      /* Using the index, apply changes to the lesson data */
      let vocabData = lesson.vocab[vocabIndex];

      for (var key in vocab_updates[i]) {
        if (
          key in vocabData &&
          typeof vocabData[key] === typeof vocab_updates[i][key]
        ) {
          vocabData[key] = vocab_updates[i][key];
        }
      }
    }
    await lesson.save();
    return sendResponse(res, 200, 'Successfully updated vocab items', vocab_updates);
  }),
);
module.exports = router;
