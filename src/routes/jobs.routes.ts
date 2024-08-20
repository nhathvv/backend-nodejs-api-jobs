import { Router } from "express";
import { createJobController } from "~/controllers/jobs.controllers";
import { accessTokenValidator } from "~/middlewares/users.middleware";
const jobRouter = Router();
/**
 * Description : Create a new job
 * PATH : /create
 * Method : POST
 * Headers: {Authorization: Bearer access_token}
 * Body : JobReqBody
 */
jobRouter.post("/create", accessTokenValidator, createJobController)
export default jobRouter;