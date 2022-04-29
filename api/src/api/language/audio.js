const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { downloadFile } = require('../../utils/aws/s3.js');
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
