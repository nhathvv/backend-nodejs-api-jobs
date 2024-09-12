import { Resumes } from "~/models/schemas/Resumes.schema"
import databaseService from "./database.service"
import { ObjectId } from "mongodb"

class ResumeService {
  async createResume(payload: { creatorId: string; jobId: string }) {
    const resume = await databaseService.resumes.insertOne(
      new Resumes({
        creatorId: new ObjectId(payload.creatorId),
        jobId: new ObjectId(payload.jobId)
      })
    )
    return resume
  }
}
const resumeService = new ResumeService()
export default resumeService
