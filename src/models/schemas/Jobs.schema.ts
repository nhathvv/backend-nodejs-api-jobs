import { ObjectId } from "mongodb";
import { JobTypes, Levels, JobStatus } from "~/constants/enum";

interface JobType {
  _id?: ObjectId,
  name : string,
  creator_id?: ObjectId,
  location: string,
  salary : number,
  quantity: number,
  level : Levels,
  status :JobStatus,
  thumbnail: string,
  type : JobTypes,
  description : string,
  skills : string[],
  start_date : Date,
  end_date : Date,
  created_at?: Date,
  updated_at?: Date
}
export class Job {
  _id?: ObjectId
  name : string
  creator_id?: ObjectId
  location: string
  salary : number
  quantity: number
  level : Levels
  status : JobStatus
  thumbnail: string
  type : JobTypes
  description : string
  skills : string[]
  start_date : Date
  end_date : Date
  created_at?: Date
  updated_at?: Date
  constructor(job: JobType) {
    const date = new Date()
    this._id = job._id
    this.name = job.name
    this.creator_id = job.creator_id
    this.location = job.location
    this.salary = job.salary
    this.quantity = job.quantity
    this.level = job.level
    this.status = job.status
    this.thumbnail = job.thumbnail
    this.type = job.type
    this.description = job.description
    this.skills = job.skills || []
    this.start_date = job.start_date
    this.end_date = job.end_date
    this.created_at = job.created_at || date
    this.updated_at = job.updated_at || date
  }
}
