import { Request, Response } from "express"
import resumeService from "~/services/resume.service"
export const resumesController = async (req: Request, res: Response) => {
  const creatorId = req.decoded_authorization.user_id
  const { jobId } = req.body
  const data = await resumeService.createResume({ creatorId, jobId })
  return res.status(201).json({
    message: "Create resume successfully",
    data
  })
}
export const updateResumeController = async (req: Request, res: Response) => {
  const resume_id = req.params.resumeId
  const status = req.body.status as string
  const data = await resumeService.updateResume(resume_id, status)
  return res.status(200).json({
    message: "Update resume successfully",
    data
  })
}
export const getJobApplyByCreatorController = async (req: Request, res: Response) => {
  const creatorId = req.decoded_authorization.user_id
  const data = await resumeService.getJobApplyByCreator(creatorId)
  return res.status(200).json({
    message: "Get job apply by creator successfully",
    data
  })
}
export const getCreatorApplyByJobController = async (req: Request, res: Response) => {
  const jobId = req.body.jobId
  const data = await resumeService.getCreatorApplyByJob(jobId)
  return res.status(200).json({
    message: "Get creator apply by job successfully",
    data
  })
}
export const getResumeByIdController = async (req: Request, res: Response) => {
  const resume_id = req.params.resumeId
  const data = await resumeService.getResumeById(resume_id)
  return res.status(200).json({
    message: "Get resume successfully",
    data
  })
}
