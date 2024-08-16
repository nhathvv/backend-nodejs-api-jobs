import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { LoginReqBody, RegisterReqBody } from "~/models/request/Users.request";

import userService from "~/services/users.service";
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const data = await userService.register(req.body)
    return res.status(201).json({
      message: 'Register success',
      data
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Register failed',
    })
  }
}
export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  try {
    const data = await userService.login(req.body)
    return res.status(200).json({
      message: 'Login success',
      data
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Login failed',
    })
  }
}