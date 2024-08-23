import { Router } from "express";
import { createJobController, deleteJobController, getJobByIDController, getJobsPaginationController, updateJobController } from "~/controllers/jobs.controllers";
import { accessTokenValidator } from "~/middlewares/users.middleware";
import { JobIdValidator, JobReqValidator, paginationValidator } from "~/middlewares/jobs.middleware";
import { wrapRequestHandler } from "~/utils/handlers";
const jobRouter = Router();
/**
 * Description : Create a new job
 * PATH : /
 * Method : POST
 * Headers: {Authorization: Bearer access_token}
 * Body : JobReqBody
 */
jobRouter.post("/", accessTokenValidator,JobReqValidator, wrapRequestHandler(createJobController))
/**
 * Description : Update a job
 * PATH : /:jobId
 * Method : PATCH
 * Headers: {Authorization: Bearer access_token}
 * Body : JobReqBody
 */
jobRouter.patch("/:jobId", accessTokenValidator,JobReqValidator, JobIdValidator, wrapRequestHandler(updateJobController))
/**
 * Description : Delete a job
 * PATH : /:jobId
 * Method : DELETE
 * Headers: {Authorization: Bearer access_token}
 */
jobRouter.delete("/:jobId", accessTokenValidator,JobIdValidator,wrapRequestHandler(deleteJobController))
/**
 * Description : Get a job by id
 * PATH : /:jobId
 * Method : GET
 * Headers: {Authorization: Bearer access_token}
 * Response : Job
 */
jobRouter.get("/:jobId", accessTokenValidator, wrapRequestHandler(getJobByIDController))
/**
 * Description : Get all jobs pagination
 * PATH : /
 * Method : GET
 * Headers: {Authorization: Bearer access_token}
 * Query : page, limit
 */
jobRouter.get("/", paginationValidator, accessTokenValidator, wrapRequestHandler(getJobsPaginationController))
export default jobRouter;