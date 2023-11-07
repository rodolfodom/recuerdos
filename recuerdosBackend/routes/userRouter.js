import { Router } from "express";
import signUpController from "../controllers/user/signUpController.js";
import confirmationController from "../controllers/user/confirmationController.js";

const userRouter = Router()

userRouter.post('/registro', signUpController);
userRouter.get('/confirmation/:token', confirmationController)

export default userRouter
