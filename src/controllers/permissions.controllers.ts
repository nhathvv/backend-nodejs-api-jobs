import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { PermissionReqBody } from "~/models/request/Permissions.request"
import permissionService from "~/services/permission.service"
export const createPermissionController = async (
  req: Request<ParamsDictionary, any, PermissionReqBody>,
  res: Response
) => {
  const data = await permissionService.createPermission(req.body)
  return res.status(201).json({
    message: "Create permission successfully",
    data
  })
}
export const updatePermissionController = async (
  req: Request<ParamsDictionary, any, PermissionReqBody>,
  res: Response
) => {
  const permission_id = req.params.permissionId
  const data = await permissionService.updatePermission(permission_id, req.body)
  return res.status(200).json({
    message: "Update permission successfully",
    data
  })
}
export const deletePermissionController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const permission_id = req.params.permissionId
  const result = await permissionService.deletePermission(permission_id)
  return res.status(200).json({
    message: "Delete permission successfully",
    result
  })
}
export const getPermissionByIDController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const permission_id = req.params.permissionId
  const data = await permissionService.getPermission(permission_id)
  return res.status(200).json({
    message: "Get permission successfully",
    data
  })
}
