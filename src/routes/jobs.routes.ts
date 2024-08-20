import { Router } from "express";
import { createJobController } from "~/controllers/jobs.controllers";
import { accessTokenValidator } from "~/middlewares/users.middleware";
const jobRouter = Router();

jobRouter.post("/create", accessTokenValidator, createJobController)
export default jobRouter;