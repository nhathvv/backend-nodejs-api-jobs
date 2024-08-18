import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import USERS_MESSAGES from "~/constants/messages";
import { LoginReqBody, RegisterReqBody } from "~/models/request/Users.request";

import userService from "~/services/users.service";
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const data = await userService.register(req.body)
    return res.status(201).json({
      message: USERS_MESSAGES.REGISTER_SUCCESS,
      data
    })
}
export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const data = await userService.login(req.body)
  return res.status(200).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    data
  })
}
