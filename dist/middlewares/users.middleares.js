"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminRoleMiddleware = exports.verifyAdminFieldMiddleware = void 0;
const verifyAdminFieldMiddleware = (req, res, next) => {
    const { isAdmin } = req.body;
    if (isAdmin !== undefined) {
        req.user.adminRoleUpdate = true;
    }
    return next();
};
exports.verifyAdminFieldMiddleware = verifyAdminFieldMiddleware;
const verifyAdminRoleMiddleware = (req, res, next) => {
    const { isAdmin, adminRoleUpdate } = req.user;
    if (!adminRoleUpdate) {
        return next();
    }
    if (!isAdmin) {
        res.status(400).json({ err: "Só adms podem atualizar outros adms!" });
    }
    return next();
};
exports.verifyAdminRoleMiddleware = verifyAdminRoleMiddleware;
//# sourceMappingURL=users.middleares.js.map