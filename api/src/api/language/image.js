const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { models } = require('../../models/index.js');
const { sendResponse } = require('../../utils/response');
const { requireAuthentication } = require('../../middleware/authentication');
const { uploadFile, downloadFile } = require('../../utils/aws/s3');
const { ERR_MISSING_OR_INVALID_DATA } = require('../../utils/constants');
const { checkIds } = require('../../utils/languageHelper');
const fs = require('fs');
const {
  requireLanguageAuthorization,
} = require('../../middleware/authorization');

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
      `${course_id}/${unit_id}/${lesson_id}/${vocab_id}/image.jpeg`,
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
  'language/image/:course_id/:unit_id/:lesson_id/:word_id',
  requireAuthentication,
  requireLanguageAuthorization,
  requireAuthentication,
  errorWrap(async (req, res) => {
    const { lesson_id, vocab_id, course_id, unit_id } = req.params;

    if (!lesson_id || !vocab_id || !course_id || !unit_id) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    if (!req.files || !req.files.file) {
      return sendResponse(res, 400, 'Missing image file, please try again.');
    }

    const isValid = await checkIds({ lesson_id, course_id, unit_id, vocab_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    let lesson = await models.Lesson.findById(lesson_id);

    if (lesson) {
      const found = lesson.vocab.findIndex(
        (element) => element._id.toString() === vocab_id,
      );

      if (found >= 0) {
        // Read in the audio file
        const filePath = req.files.file.file;
        const fileContent = fs.readFileSync(filePath);

        // Upload file to S3
        await uploadFile(
          fileContent,
          `${course_id}/${unit_id}/${lesson_id}/${vocab_id}/image.jpeg`,
        );

        // Upadte path to audio file in MongoDB
        lesson.vocab[
          found
        ].image = `${course_id}/${unit_id}/${lesson_id}/${vocab_id}/image.jpeg`;

        await lesson.save();

        return sendResponse(
          res,
          200,
          'Success uploading the image file.',
          lesson.vocab[found],
        );
      }

      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
  }),
);

module.exports = router;
