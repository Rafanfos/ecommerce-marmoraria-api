import { Router } from "express";
import { createUserController } from "../controllers/auth.controllers";

const authRouter = Router();

authRouter.post("/register", createUserController);

export default authRouter;
