<<<<<<< HEAD
import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import USERS_MESSAGES from "~/constants/messages"
import { LoginReqBody, RegisterReqBody, UpdateMeReqBody } from "~/models/request/Users.request"
import jobService from "~/services/jobs.service"

import userService from "~/services/users.service"
=======
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import USERS_MESSAGES from '~/constants/messages'
import { LoginReqBody, RegisterReqBody, UpdateMeReqBody } from '~/models/request/Users.request'
import jobService from '~/services/jobs.service'

import userService from '~/services/users.service'
>>>>>>> 50cf6f3f2cda8911da45bb18228fef8a8137e831
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
export const getMeController = async (req: Request, res: Response) => {
  const user_id = req.decoded_authorization.user_id
  const data = await userService.getMe(user_id)
  return res.status(200).json({
    message: USERS_MESSAGES.GET_ME_SUCCESS,
    data
  })
}
export const updateMeController = async (req: Request<ParamsDictionary, any, UpdateMeReqBody>, res: Response) => {
  const user_id = req.decoded_authorization.user_id
  const data = await userService.updateMe(user_id, req.body)
  return res.status(200).json({
    message: USERS_MESSAGES.UPDATE_ME_SUCCESS,
    data
  })
}
