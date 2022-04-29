const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { models } = require('../../models/index.js');
const { sendResponse } = require('../../utils/response');
const { requireAuthentication } = require('../../middleware/authentication');
const { uploadFile } = require('../../utils/aws/s3');
const { ERR_MISSING_OR_INVALID_DATA } = require('../../utils/constants');
const { checkIds } = require('../../utils/languageHelper');

router.post(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const { lesson_id, vocab_id, course_id, unit_id } = req.body;

    if (!lesson_id || !vocab_id || !course_id || !unit_id) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }
    const isValid = await checkIds({ lesson_id, course_id, unit_id, vocab_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    const file = req.files.uploadedFile;
    await uploadFile(
      file.data,
      `${req.id}/${req.stepKey}/${req.fieldKey}/${req.fileName}`,
    );
    
    let lesson = await models.Lesson.findById(lesson_id);
    lesson = lesson.toJSON();
    const found = lesson.vocab.findIndex((vocabItem) => vocabItem._id === vocab_id);

    lesson.vocab[
      found
    ].image = `${req.id}/${req.stepKey}/${req.fieldKey}/${req.fileName}`;

    await lesson.save();

    return sendResponse(
      res,
      200,
      'Success posting vocab image file Path',
      lesson,
    );
  }),
);
