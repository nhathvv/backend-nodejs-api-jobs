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
