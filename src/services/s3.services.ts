import AWS from "aws-sdk";
import s3Config from "../config";
import { convertImgToBase64 } from "../utils/images.utils";
import { AppError } from "../errors/app.error";

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

// const uploadAvatarToS3 = async (img: any, userId: string) => {
//   try {
//     const params = {
//       filePath: `users/avatars/${userId}_${Date.now()}_${file.name}`,
//       buffer: img.data, // Using timestamp to ensure unique filenames
//       ContentType: image.type,
//       ACL: "public-read",
//     };

//     const data = await s3.upload(params).promise();
//   } catch (error) {
//     throw new AppError("Erro ao enviar avatar para o S3", 500);
//   }
// };

export { getStoneImgFromS3 };
