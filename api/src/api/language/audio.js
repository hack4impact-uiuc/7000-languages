const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { uploadFile, downloadFile } = require('../../utils/aws/s3.js');
const { requireAuthentication } = require('../../middleware/authentication');
const {
  requireLanguageAuthorization,
} = require('../../middleware/authorization');
const { ERR_MISSING_OR_INVALID_DATA } = require('../../utils/constants');
const { checkIds } = require('../../utils/languageHelper');
const fs = require('fs');

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

    // Get the audio file path from AWS
    let lesson = await models.Lesson.findById(lesson_id); // find a lesson
    if (lesson) {
      const found = lesson.vocab.findIndex(
        (element) => element._id.toString() === vocab_id,
      );

      if (found >= 0) {
        const vocabItem = lesson.vocab[found];

        let fileType = 'm4a';
        const splitAudioPath = vocabItem.audio.split('.');

        if (splitAudioPath.length === 2) {
          fileType = splitAudioPath[1];
        }

        // Open a stream from the S3 bucket
        const s3Stream = downloadFile(
          `${course_id}/${unit_id}/${lesson_id}/${vocab_id}/audio.${fileType}`,
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
      }
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }
  }),
);

router.post(
  '/:course_id/:unit_id/:lesson_id/:vocab_id',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const { lesson_id, vocab_id, course_id, unit_id } = req.params;

    if (!lesson_id || !vocab_id || !course_id || !unit_id) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    if (!req.files || !req.files.file) {
      return sendResponse(res, 400, 'Missing audio file, please try again.');
    }

    // Check if the course, unit, and lesson ids are valid
    const isValid = await checkIds({ lesson_id, course_id, unit_id, vocab_id });

    if (!isValid) {
      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    // Check if vocab item exists
    let lesson = await models.Lesson.findById(lesson_id); // find a lesson
    if (lesson) {
      const found = lesson.vocab.findIndex(
        (element) => element._id.toString() === vocab_id,
      );

      if (found >= 0) {
        // Determines file type
        const nameSplit = req.files.file.filename.split('.');
        let fileType = 'm4a';
        if (nameSplit.length === 2) {
          fileType = nameSplit[1];
        }

        // Reads in the audio file
        const filePath = req.files.file.file;
        const fileContent = fs.readFileSync(filePath);

        // Upload file to S3
        await uploadFile(
          fileContent,
          `${course_id}/${unit_id}/${lesson_id}/${vocab_id}/audio.${fileType}`,
        );

        // Upadte path to audio file in MongoDB
        lesson.vocab[
          found
        ].audio = `${course_id}/${unit_id}/${lesson_id}/${vocab_id}/audio.${fileType}`;

        await lesson.save();

        return sendResponse(
          res,
          200,
          'Success uploading the audio file.',
          lesson.vocab[found],
        );
      }

      return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
    }

    return sendResponse(res, 400, ERR_MISSING_OR_INVALID_DATA);
  }),
);

module.exports = router;
