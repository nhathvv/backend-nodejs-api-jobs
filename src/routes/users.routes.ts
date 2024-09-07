import { Router } from "express"
import {
  getMeController,
  loginController,
  registerController,
  updateMeController
} from "~/controllers/users.controller"
import {
  accessTokenValidator,
  loginValidator,
  registerValidator,
  updateMeValidator
} from "~/middlewares/users.middleware"
import { wrapRequestHandler } from "~/utils/handlers"
const userRouter = Router()
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
userRouter.post("/login", loginValidator, wrapRequestHandler(loginController))
/**
 * Description: Get user info
 * Path: /me
 * Method: GET
 * Headers: {Authorization: Bearer access_token}
 *  */
userRouter.get("/me", accessTokenValidator, wrapRequestHandler(getMeController))
/**
 * Description: Update user info
 * Path: /me
 * Method: PATCH
 * Headers: {Authorization: Bearer access_token}
 * Body : {fullname: string, email: string, Level: Levels, Phone: string, Skills}
 */
userRouter.patch("/me", accessTokenValidator, updateMeValidator, wrapRequestHandler(updateMeController))
export default userRouter
