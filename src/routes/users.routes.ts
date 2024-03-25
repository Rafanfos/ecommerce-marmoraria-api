import { Router } from "express";
import { verifyAuthMiddleware } from "../middlewares/auth.middleware";
import {
  verifyAdminFieldMiddleware,
  verifyAdminRoleMiddleware,
} from "../middlewares/users.middleares";
import { updateUserController } from "../controllers/users.controllers";

const usersRouter = Router();

usersRouter.patch(
  "/edit/:userId",
  verifyAuthMiddleware,
  verifyAdminFieldMiddleware,
  verifyAdminRoleMiddleware,
  updateUserController
);

export default usersRouter;
