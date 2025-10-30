const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const { s3 } = require("../config/s3Client");

const bucketName = process.env.S3_BUCKET_NAME || 'astroonemedia';
const AWS_REGION = process.env.AWS_REGION || 'ap-south-1';
/**
 * Upload file to S3
 * @param {Object} file - Multer file object
 * @param {String} folderName - Folder name in S3 bucket
 * @returns {String} File URL
 */
const uploadFileToS3 = async (file, folderName = "uploads") => {
  try {
    const key = `${folderName}/${Date.now()}_${file.originalname}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const parallelUpload = new Upload({
      client: s3,
      params: uploadParams,
    });

    await parallelUpload.done();

    return `https://${bucketName}.s3.${AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Failed to upload file to S3");
  }
};

module.exports = {
    uploadFileToS3
}
