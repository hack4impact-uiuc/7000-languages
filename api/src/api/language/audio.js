const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { uploadFile, downloadFile } = require('../../utils/aws/s3.js');
const { requireAuthentication } = require('../../middleware/authentication');
const {
  requireLanguageAuthorization,
} = require('../../middleware/authorization');
const { ERR_MISSING_OR_INVALID_DATA } = require('../../utils/constants');
const { checkIds } = require('../../utils/languageHelper');

router.get(
  '/:course_id/:unit_id/:lesson_id/:vocab_id/',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const { course_id, unit_id, lesson_id, vocab_id } = req.params;

    const isValid = await checkIds({ course_id, unit_id, lesson_id, vocab_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    // Open a stream from the S3 bucket
    const s3Stream = downloadFile(
      `files/${course_id}/${unit_id}/${lesson_id}/${vocab_id}/audio`,
    ).createReadStream();

    // Setup callbacks for stream error and stream close
    s3Stream
      .on('error', (err) => {
        res.json(`S3 Error:${err}`);
      })
      .on('close', () => {
        res.end();
      });

    // Pipe the stream to the client
    s3Stream.pipe(res);
  }),
);

router.post(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const { lesson_id, vocab_id, course_id, unit_id } = req.body;

    if (!lesson_id || !vocab_id || !course_id || !unit_id) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }
    const isValid = await checkIds({ lesson_id, course_id, unit_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    let lesson = await models.Lesson.findOne({ _id: lesson_id }); // find a lesson
    if (lesson) {
      const vocab = lesson.vocab;
      const found = vocab.findIndex((element) => element._id === vocab_id);
      if (found >= 0) {
        const file = req.files.uploadedFile;
        await uploadFile(
          file.data,
          `${req.id}/${req.stepKey}/${req.fieldKey}/${req.fileName}`,
        );

        lesson.vocab[
          found
        ].audio = `${req.id}/${req.stepKey}/${req.fieldKey}/${req.fileName}`;

        await lesson.save();

        return sendResponse(
          res,
          200,
          'Success posting vocab audio file path',
          lesson,
        );
      }

      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
  }),
);

module.exports = router;

