import { Router } from "express";
import {
  createUserController,
  loginController,
} from "../controllers/auth.controllers";
import {
  validateLoginMiddleware,
  verifyEmailExistsMiddleware,
} from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/register", verifyEmailExistsMiddleware, createUserController);
authRouter.post("/login", validateLoginMiddleware, loginController);

export default authRouter;
