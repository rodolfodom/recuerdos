import { Router } from "express";
import signUpController from "../controllers/user/signUpController.js";
import confirmationController from "../controllers/user/confirmationController.js";
import logInController from "../controllers/user/logiInController.js";

const userRouter = Router()

userRouter.post('/signup', signUpController);
userRouter.get('/confirmation/:token', confirmationController)
userRouter.post('/login', logInController)

export default userRouter
