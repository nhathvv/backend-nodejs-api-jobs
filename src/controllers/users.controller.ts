import { Request, Response } from "express";
import userService from "~/services/users.service";
export const registerController = async (req: Request, res: Response) => {
  const { fullname , email, password} = req.body
  try {
    const result = await userService.register({fullname, email, password})
    return res.status(201).json({
      message: 'Register success',
      result
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Register failed',
    })
  }
}