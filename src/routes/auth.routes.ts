import { Router } from "express";
import {
  createUserController,
  loginController,
} from "../controllers/auth.controllers";
import {
  validateLoginMiddleware,
  verifyEmailOrUsernameExistsMiddleware,
} from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post(
  "/register",
  verifyEmailOrUsernameExistsMiddleware,
  createUserController
);
authRouter.post("/login", validateLoginMiddleware, loginController);

export default authRouter;
