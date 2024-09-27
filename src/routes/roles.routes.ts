import { Router } from "express"
import { createRoleController } from "~/controllers/roles.controllers"
import { createRoleValidator } from "~/middlewares/roles.middleware"
import { accessTokenValidator } from "~/middlewares/users.middleware"
import { wrapRequestHandler } from "~/utils/handlers"
const rolesRouter = Router()
/**
 * Description: Create a new role
 * Path: /
 * Method: POST
 * Headers: {Authorization: Bearer access_token}
 * Role: Admin
 */
rolesRouter.post("/", accessTokenValidator, createRoleValidator, wrapRequestHandler(createRoleController))
export default rolesRouter
