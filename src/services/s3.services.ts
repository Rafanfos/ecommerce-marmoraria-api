import AWS from "aws-sdk";
import s3Config from "../config";
import { convertImgToBase64 } from "../utils/images.utils";

AWS.config.update({
  accessKeyId: s3Config.accessKeyId,
  secretAccessKey: s3Config.secretAccessKey,
});

const s3 = new AWS.S3();

const getStoneImgFromS3 = async (imgPath: string, category: string) => {
  try {
    const key = `imagens-produtos/${category}/${imgPath}`;
    const params = {
      Bucket: s3Config.s3Bucket,
      Key: key,
    };

    const data = await s3.getObject(params).promise();

    const formattedData = convertImgToBase64(imgPath, data);

    return formattedData;
  } catch (error) {
    console.error("Erro ao obter objeto do S3:", error);
    throw error;
  }
};

export { getStoneImgFromS3 };
