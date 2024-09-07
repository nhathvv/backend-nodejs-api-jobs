import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import USERS_MESSAGES from "~/constants/messages"
import { JobReqBody } from "~/models/request/Jobs.request"
import jobService from "~/services/jobs.service"
export const createJobController = async (req: Request<ParamsDictionary, any, JobReqBody>, res: Response) => {
  const user_id = req.decoded_authorization.user_id
  const data = await jobService.createJob(user_id, req.body)
  return res.status(201).json({
    message: USERS_MESSAGES.CREATE_JOB_SUCCESS,
    data
  })
}
export const updateJobController = async (req: Request<ParamsDictionary, any, JobReqBody>, res: Response) => {
  const user_id = req.decoded_authorization.user_id
  const job_id = req.params.jobId
  console.log("REQ BODY", req.body)
  const data = await jobService.updateJob(user_id, job_id, req.body)
  return res.status(200).json({
    message: USERS_MESSAGES.UPDATE_JOB_SUCCESS,
    data
  })
}
export const deleteJobController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const user_id = req.decoded_authorization.user_id
  const job_id = req.params.jobId
  console.log("USER_ID", user_id)
  console.log("JOB_ID", job_id)
  const result = await jobService.deleteJob(user_id, job_id)
  return res.status(200).json({
    message: USERS_MESSAGES.DELETE_JOB_SUCCESS,
    result
  })
}
export const getJobByIDController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const job_id = req.params.jobId
  const data = await jobService.getJob(job_id)
  return res.status(200).json({
    message: USERS_MESSAGES.GET_JOB_SUCCESS,
    data
  })
}
export const getJobsPaginationController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const { jobs, total } = await jobService.getJobsPagination(page, limit)
  return res.status(200).json({
    message: USERS_MESSAGES.GET_JOBS_SUCCESS,
    data: {
      page,
      limit,
      total_page: Math.ceil(total / limit),
      jobs
    }
  })
}
export const searchController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const content = req.query.content as string
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const { jobs, total } = await jobService.search({ content, page, limit })
  return res.status(200).json({
    message: USERS_MESSAGES.SEARCH_SUCCESS,
    data: {
      page,
      limit,
      total_page: Math.ceil(total / limit),
      jobs
    }
  })
}
