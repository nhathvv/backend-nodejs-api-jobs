import { Router } from "express";
import { loginController, registerController } from "~/controllers/users.controller";
import { loginValidator, registerValidator } from "~/middlewares/users.middleware";
const userRouter = Router();
/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Body : {fullname: string, email: string, password: string}
 */
userRouter.post("/register", registerValidator, registerController)
/**
 * Description: Login user
 * Path: /login
 * Method: POST
 * Body : {email: string, password: string}
 */
userRouter.post("/login", loginValidator, loginController)
export default userRouter;