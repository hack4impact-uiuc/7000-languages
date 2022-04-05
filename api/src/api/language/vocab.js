const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { requireAuthentication } = require('../../middleware/authentication');
const {
  ERR_MISSING_OR_INVALID_DATA,
  SUCCESS_POSTING_VOCAB_DATA,
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
      return sendResponse(res, 404, ERR_MISSING_OR_INVALID_DATA);
    }

    await models.Lesson.exists(
      {
        _course_id: course_id,
        _unit_id: unit_id,
        _id: lesson_id,
      },
      function (err) {
        if (err) {
          return sendResponse(res, 404, 'Vocab item not found');
        }
      },
    );

    const lesson = await models.Lesson.findById({
      _course_id: course_id,
      _unit_id: unit_id,
      _id: lesson_id,
    });

    const vocabIndex = getVocabIndexByID(vocab_id, lesson);

    // eslint-disable-next-line no-magic-numbers
    if (vocabIndex === -1) {
      return sendResponse(res, 404, 'Vocab item not found');
    }

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
      const lessonData = await models.Lesson.findOne({
        _course_id: course_id,
        _unit_id: unit_id,
        _id: lesson_id,
      });
      if (lessonData === null) {
        return sendResponse(res, 404, ERR_MISSING_OR_INVALID_DATA);
      }
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
