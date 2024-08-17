import { Router } from "express";
import { accessTokenController, loginController, registerController } from "~/controllers/users.controller";
import { accessTokenValidator, loginValidator, registerValidator } from "~/middlewares/users.middleware";
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
/**
 * Description: Verify access token
 * Path: /verify-access-token
 * Method: POST
 * Headers : {Authorization: Bearer <access_token>}
 */
userRouter.post("/verify-access-token", accessTokenValidator, accessTokenController)
export default userRouter;