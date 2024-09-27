import { Router } from "express"
import {
  createPermissionController,
  deletePermissionController,
  getPermissionByIDController,
  updatePermissionController
} from "~/controllers/permissions.controllers"
import {
  checkIdPermissionValidator,
  createPermissionValidator,
  updatePermissionValidator
} from "~/middlewares/permission.middleware"
import { accessTokenValidator } from "~/middlewares/users.middleware"
import { wrapRequestHandler } from "~/utils/handlers"
const permissionsRouter = Router()
/**
 * Description: Create a new permission
 * Path: /
 * Method: POST
 * Headers: {Authorization: Bearer access_token}
 * Body : PermissionReqBody
 * Role: Admin
 */
permissionsRouter.post(
  "/",
  accessTokenValidator,
  createPermissionValidator,
  wrapRequestHandler(createPermissionController)
)
/**
 * Description: Update a permission
 * Path: /:permissionId
 * Method: PATCH
 * Headers: {Authorization: Bearer access_token}
 * Body : PermissionReqBody
 * Role: Admin
 */
permissionsRouter.patch(
  "/:permissionId",
  accessTokenValidator,
  updatePermissionValidator,
  wrapRequestHandler(updatePermissionController)
)
/**
 * Description: Delete a permission
 * Path: /:permissionId
 * Method: DELETE
 * Headers: {Authorization: Bearer access_token}
 * Response: Permission
 * Role: Admin
 */
permissionsRouter.delete(
  "/:permissionId",
  accessTokenValidator,
  checkIdPermissionValidator,
  wrapRequestHandler(deletePermissionController)
)
/**
 * Description: Get permission by id
 * Path: /:permissionId
 * Method: GET
 * Headers: {Authorization: Bearer access_token}
 * Response: Permission
 * Role: Admin
 */
permissionsRouter.get(
  "/:permissionId",
  accessTokenValidator,
  checkIdPermissionValidator,
  wrapRequestHandler(getPermissionByIDController)
)
export default permissionsRouter
