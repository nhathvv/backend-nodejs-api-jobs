import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { RoleReqBody } from "~/models/request/Roles.request"
import roleService from "~/services/role.service"
export const createRoleController = async (req: Request<ParamsDictionary, any, RoleReqBody>, res: Response) => {
  const data = await roleService.createRole(req.body)
  return res.status(201).json({
    message: "Create role successfully",
    data
  })
}
