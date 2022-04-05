const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { requireAuthentication } = require('../../middleware/authentication');
const {
  ERR_MISSING_OR_INVALID_DATA,
  SUCCESS_POSTING_VOCAB_DATA,
  NOT_FOUND_INDEX,
} = require('../../utils/constants');
const { getVocabIndexByID } = require('../../utils/languageHelper');

/**
 * Updates the fields for a vocab item
 */
router.patch(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const { course_id, unit_id, lesson_id, vocab_id, vocab_update } = req.body;

    if (!course_id || !unit_id || !lesson_id || !vocab_id || !vocab_update) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    /* Get the lesson data from MongoDB */
    let lesson;

    try {
      lesson = await models.Lesson.findById({
        _course_id: course_id,
        _unit_id: unit_id,
        _id: lesson_id,
      });
    } catch (error) {
      return sendResponse(res, 404, ERR_MISSING_OR_INVALID_DATA);
    }

    if (lesson) {
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
      return sendResponse(res, 200, 'Successfully updated vocab item', lesson);
    }

    return sendResponse(res, 404, ERR_MISSING_OR_INVALID_DATA);
  }),
);

/**
 * Creates a new vocab item in a lesson
 */
router.post(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const { course_id, unit_id, lesson_id, vocab } = req.body;
    if (!course_id || !unit_id || !lesson_id || !vocab) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    try {
      // Obtain the lesson mongoose document
      const lessonData = await models.Lesson.findOne({
        _course_id: course_id,
        _unit_id: unit_id,
        _id: lesson_id,
      });
      if (lessonData === null) {
        return sendResponse(res, 404, ERR_MISSING_OR_INVALID_DATA);
      }
      // Give the new vocab item an order value and push to lesson mongoose document
      vocab._order = lessonData.vocab.length;
      lessonData.vocab.push(vocab);
      await lessonData.save();

      return sendResponse(res, 200, SUCCESS_POSTING_VOCAB_DATA, vocab);
    } catch (error) {
      console.error('POST /vocab/: ', error.message);
      return sendResponse(res, 404, ERR_MISSING_OR_INVALID_DATA);
    }
  }),
);

module.exports = router;
