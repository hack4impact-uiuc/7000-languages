const AWS = require('aws-sdk');

const {
    S3_BUCKET_NAME, S3_REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY,
} = require('./awsExports');

const getS3 = () => {
    const s3 = new AWS.S3({
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
        region: S3_REGION,
    });

    return s3;
}

const uploadFile = async (content, remoteFileName) => {
    const params = {
      Body: content,
      Bucket: S3_BUCKET_NAME,
      Key: remoteFileName,
    };
  
    const s3 = getS3(S3_CREDENTIALS);
    await s3.putObject(params).promise();
  };
