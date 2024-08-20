import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import USERS_MESSAGES from "~/constants/messages";
import { JobReqBody } from "~/models/request/Jobs.request";
import jobService from "~/services/jobs.service";
export const createJobController = async (req:  Request<ParamsDictionary, any, JobReqBody>, res: Response) => {
  const user_id = req.decoded_authorization.user_id
  const data = await jobService.createJob(user_id, req.body)
  return res.status(201).json({
    message : USERS_MESSAGES.CREATE_JOB_SUCCESS,
    data
  })
}