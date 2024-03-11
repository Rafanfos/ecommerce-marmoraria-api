import dotenv from "dotenv";

dotenv.config();

const s3Config = {
  accessKeyId: process.env.S3_ACCESS_KEY || "",
  secretAccessKey: process.env.S3_SECRET_KEY || "",
  s3Uri: process.env.S3_URI || "",
  s3Bucket: process.env.S3_BUCKET_NAME || "",
};

export default s3Config;
