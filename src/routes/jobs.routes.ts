import { Router } from "express"
import {
  createJobController,
  deleteJobController,
  getJobByIDController,
  getJobsPaginationController,
  updateJobController
} from "~/controllers/jobs.controllers"
import { accessTokenValidator } from "~/middlewares/users.middleware"
import { paginationValidator } from "~/middlewares/jobs.middleware"
import { wrapRequestHandler } from "~/utils/handlers"
const jobRouter = Router()
/**
 * Description : Create a new job
 * PATH : /
 * Method : POST
 * Headers: {Authorization: Bearer access_token}
 * Body : JobReqBody
 * Role: Client
 */
jobRouter.post("/", accessTokenValidator, wrapRequestHandler(createJobController))
/**
 * Description : Update a job
 * PATH : /:jobId
 * Method : PATCH
 * Headers: {Authorization: Bearer access_token}
 * Body : JobReqBody
 * Role: Client && Admin
 */
jobRouter.patch("/:jobId", accessTokenValidator, wrapRequestHandler(updateJobController))
/**
 * Description : Delete a job
 * PATH : /:jobId
 * Method : DELETE
 * Headers: {Authorization: Bearer access_token}
 * Role: Admin && Creator
 */
jobRouter.delete("/:jobId", accessTokenValidator, wrapRequestHandler(deleteJobController))
/**
 * Description : Get a job by id
 * PATH : /:jobId
 * Method : GET
 * Headers: {Authorization: Bearer access_token}
 * Response : Job
 * Role: Admin && Creator
 */
jobRouter.get("/:jobId", accessTokenValidator, wrapRequestHandler(getJobByIDController))
/**
 * Description : Get all jobs pagination
 * PATH : /
 * Method : GET
 * Headers: {Authorization: Bearer access_token}
 * Query : page, limit
 * Role: Admin && Creator
 */
jobRouter.get("/", paginationValidator, wrapRequestHandler(getJobsPaginationController))
export default jobRouter
