const AWS = require('aws-sdk');

const {
  S3_BUCKET_NAME,
  S3_REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
} = require('./awsExports');

const getS3 = () => {
  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: S3_REGION,
  });

  return s3;
};

// S3 Credential Object created with access id and secret key
// const S3_CREDENTIALS = {
//     accessKeyId: ACCESS_KEY_ID,
//     secretAccessKey: SECRET_ACCESS_KEY,
// };

/**
 * Downloads file from the S3 bucket
 * @param objectKey The key as defined in S3 console. Usually is just the full path of the file.
 * @param credentials The temporary credentials of the end user. Frontend should provide this.
 * @param onDownloaded Callback after finished downloading. Params are (err, data).
 */
module.exports.downloadFile = (objectKey) => {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: objectKey,
  };

  const s3 = getS3();
  const object = s3.getObject(params);

  return object;
};

// module.exports.downloadFile;
