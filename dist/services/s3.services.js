"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoneImgFromS3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = __importDefault(require("../config"));
const images_utils_1 = require("../utils/images.utils");
aws_sdk_1.default.config.update({
    accessKeyId: config_1.default.accessKeyId,
    secretAccessKey: config_1.default.secretAccessKey,
});
const s3 = new aws_sdk_1.default.S3();
const getStoneImgFromS3 = (imgPath, category) => __awaiter(void 0, void 0, void 0, function* () {
    const formmatedCategory = category
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    try {
        const key = `imagens-produtos/${formmatedCategory}/${imgPath}`;
        const params = {
            Bucket: config_1.default.s3Bucket,
            Key: key,
        };
        const data = yield s3.getObject(params).promise();
        const formattedData = (0, images_utils_1.convertImgToBase64)(imgPath, data);
        return formattedData;
    }
    catch (error) {
        console.error("Erro ao obter objeto do S3:", error);
        throw error;
    }
});
exports.getStoneImgFromS3 = getStoneImgFromS3;
//# sourceMappingURL=s3.services.js.map