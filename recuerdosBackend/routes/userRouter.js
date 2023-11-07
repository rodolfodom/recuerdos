import { Router } from "express";
import signUpController from "../controllers/user/signUpController.js";

const userRouter = Router()

userRouter.post('/registro', signUpController);

export default userRouter
