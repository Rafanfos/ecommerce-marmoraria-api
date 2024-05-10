"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertImgToBase64 = void 0;
const convertImgToBase64 = (imgPath, data) => {
    const imageType = imgPath.endsWith(".png") ? "png" : "jpeg";
    const base64Data = `data:image/${imageType};base64,${data.Body.toString("base64")}`;
    return base64Data;
};
exports.convertImgToBase64 = convertImgToBase64;
//# sourceMappingURL=images.utils.js.map