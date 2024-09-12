import { ObjectId } from "mongodb"
import { ResumeStatus } from "~/constants/enum"

type ResumeType = {
  _id?: ObjectId
  creatorId: ObjectId
  jobId: ObjectId
  status?: ResumeStatus
  created_at?: Date
  update_at?: Date
}
export class Resumes {
  _id?: ObjectId
  creatorId: ObjectId
  jobId: ObjectId
  status?: ResumeStatus
  created_at?: Date
  update_at?: Date
  constructor(resume: ResumeType) {
    const date = new Date()
    this._id = resume._id
    this.creatorId = resume.creatorId
    this.jobId = resume.jobId
    this.status = resume.status || ResumeStatus.PENDING
    this.created_at = resume.created_at || date
    this.update_at = resume.update_at || date
  }
}
