import { PromiseResult } from "aws-sdk/lib/request";

const convertImgToBase64 = (
  imgPath: string,
  data: PromiseResult<AWS.S3.GetObjectOutput, AWS.AWSError>
) => {
  const imageType = imgPath.endsWith(".png") ? "png" : "jpeg";

  const base64Data = `data:image/${imageType};base64,${data.Body.toString(
    "base64"
  )}`;

  return base64Data;
};

export { convertImgToBase64 };
