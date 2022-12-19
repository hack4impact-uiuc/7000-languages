const AWS = require('aws-sdk');

const {
  S3_BUCKET_NAME,
  S3_REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
} = require('./exports');

const getS3 = () => {
  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: S3_REGION,
  });

  return s3;
};

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

module.exports.uploadFile = async (content, remoteFileName) => {
  const params = {
    Body: content,
    Bucket: S3_BUCKET_NAME,
    Key: remoteFileName,
  };

  const s3 = getS3();
  await s3.putObject(params).promise();
};

module.exports.deleteFile = async (objectKey) => {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: objectKey,
  };

  const s3 = getS3();
  await s3.deleteObject(params).promise();
};

/**
 * Delete's all of the files in a folder
 * @param {String} folderName The id of the patient
 * Source: https://stackoverflow.com/questions/20207063/how-can-i-delete-folder-on-s3-with-node-js
 */
const deleteFolder = async (folderName) => {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Prefix: `${folderName}/`,
  };

  const s3 = getS3();

  // Gets up to 1000 files that need to be deleted
  const listedObjects = await s3.listObjectsV2(params).promise();
  if (listedObjects.Contents.length === 0) {
    return;
  }

  const deleteParams = {
    Bucket: S3_BUCKET_NAME,
    Delete: { Objects: [] },
  };

  // Builds a list of the files to delete
  listedObjects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key });
  });

  // Deletes the files from S3
  await s3.deleteObjects(deleteParams).promise();

  // If there are more than 1000 objects that need to be deleted from the folder
  if (listedObjects.IsTruncated) {
    await deleteFolder(folderName);
  }
};

module.exports.deleteFolder = deleteFolder;
