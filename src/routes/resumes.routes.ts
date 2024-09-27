import { Router } from "express"
import {
  getCreatorApplyByJobController,
  getJobApplyByCreatorController,
  getResumeByIdController,
  resumesController,
  updateResumeController
} from "~/controllers/resumes.controllers"
import { resumesValidator, updateResumeValidator } from "~/middlewares/resumes.middleware"
import { accessTokenValidator } from "~/middlewares/users.middleware"
import { wrapRequestHandler } from "~/utils/handlers"
const resumesRouter = Router()
/**
 * Description: Create a new resume
 * Path: /
 * Method: POST
 * Headers: {Authorization: Bearer access_token}
 * Role: Creator
 */
resumesRouter.post("/", accessTokenValidator, resumesValidator, wrapRequestHandler(resumesController))
/**
 * Description: Update status of a resume
 * Path: /:resumeId
 * Method: PATCH
 * Headers: {Authorization: Bearer access_token}
 * Body: { status: string }
 * Role: Admin && Creator
 */
resumesRouter.patch(
  "/:resumeId",
  accessTokenValidator,
  updateResumeValidator,
  wrapRequestHandler(updateResumeController)
)
/**
 * Description: display all jobs by 1 creator
 * Path: /
 * Method: GET
 * Headers: {Authorization: Bearer access_token}
 * Role: Creator
 */
resumesRouter.get("/jobs", accessTokenValidator, wrapRequestHandler(getJobApplyByCreatorController))
/**
 * Description: display all creator by 1 job
 * Path: /creator
 * Method: GET
 * Headers: {Authorization: Bearer access_token}
 * Body: { jobId: string }
 * Role: Admin
 */
resumesRouter.get(
  "/creator",
  accessTokenValidator,
  resumesValidator,
  wrapRequestHandler(getCreatorApplyByJobController)
)
/**
 * Description: get resume by id
 * Path: /:resumeId
 * Method: GET
 * Headers: {Authorization: Bearer access_token}
 * Role: Admin && Creator
 */
resumesRouter.get("/:resumeId", accessTokenValidator, wrapRequestHandler(getResumeByIdController))
export default resumesRouter
