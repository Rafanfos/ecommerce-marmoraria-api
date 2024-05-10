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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserService = void 0;
const app_error_1 = require("../errors/app.error");
const users_model_1 = require("../models/users.model");
// import { uploadAvatarToS3 } from "./s3.services";
const updateUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = userData, updatedFields = __rest(userData, ["_id"]);
        // if (userData.avatar) {
        //   await uploadAvatarToS3(userData.avatar, userData._id);
        // }
        const updatedUser = yield users_model_1.UserModel.findOneAndUpdate({ _id }, { $set: updatedFields }, { new: true, projection: { password: 0 } });
        if (!updatedUser) {
            throw new app_error_1.AppError("Usuário não encontrado para atualização!", 404);
        }
        return updatedUser;
    }
    catch (error) {
        throw new app_error_1.AppError("Erro no servidor", 500);
    }
});
exports.updateUserService = updateUserService;
//# sourceMappingURL=users.services.js.map