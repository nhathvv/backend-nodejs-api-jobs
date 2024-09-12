import { Router } from "express"
import { resumesController } from "~/controllers/resumes.controllers"
import { resumesValidator } from "~/middlewares/resumes.middleware"
import { accessTokenValidator } from "~/middlewares/users.middleware"
import { wrapRequestHandler } from "~/utils/handlers"
const resumesRouter = Router()
/**
 * Description: Create a new resume
 * Path: /
 * Method: POST
 * Headers: {Authorization: Bearer access_token}
 */
resumesRouter.post("/", accessTokenValidator, resumesValidator, wrapRequestHandler(resumesController))
/**
 * Description: Update status of a resume
 * Path: /:resumeId
 * Method: PATCH
 * Headers: {Authorization: Bearer access_token}
 * Body: { status: string }
 */
resumesRouter.patch("/:resumeId", accessTokenValidator, wrapRequestHandler(resumesController))
export default resumesRouter
