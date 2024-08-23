import databaseService from "./database.service";
import { Job } from "~/models/schemas/Jobs.schema";
import { JobReqBody } from "~/models/request/Jobs.request";
import { ObjectId } from "mongodb";
import userService from "./users.service";


class JobService {
  async createJob(user_id:string, payload : JobReqBody) {
    const skills = await userService.checkAndCreateSkill(payload.skills)
    const job = await databaseService.jobs.insertOne(
      new Job({
        ...payload,
        skills,
        user_id : new ObjectId(user_id),
      }),
    )
    return job
  }
  async updateJob(user_id:string, job_id:string, payload : JobReqBody) {
    const skills = await userService.checkAndCreateSkill(payload.skills)
    await databaseService.jobs.findOneAndUpdate(
      {
        _id : new ObjectId(job_id),
        user_id : new ObjectId(user_id)
      },
      {
        $set : {
          ...payload,
          skills
        }
      },
      {
        returnDocument : 'after'
      }
    )
    const [result] = await databaseService.jobs.aggregate([
      {
        '$match': {
          '_id': new ObjectId('66c87e389edafe49db773e8e')
        }
      }, {
        '$lookup': {
          'from': 'skills', 
          'localField': 'skills', 
          'foreignField': '_id', 
          'as': 'skills'
        }
      }
    ]).toArray()
    return result
  }
  async deleteJob(user_id:string, job_id:string) {
    const result = await databaseService.jobs.deleteOne({
      _id : new ObjectId(job_id),
      user_id : new ObjectId(user_id)
    })
    return result
  }
  async getJob(job_id:string) {
    const [job] = await databaseService.jobs.aggregate([
      {
        '$match': {
          '_id': new ObjectId(job_id)
        }
      }, {
        '$lookup': {
          'from': 'skills', 
          'localField': 'skills', 
          'foreignField': '_id', 
          'as': 'skills'
        }
      }
    ]).toArray()
    return job
  }
  async getJobsPagination(page:number, limit:number) {
    const jobs = await databaseService.jobs.aggregate([
      {
        '$skip': (page - 1) * limit
      }, {
        '$limit': limit
      }, {
        '$lookup': {
          'from': 'skills', 
          'localField': 'skills', 
          'foreignField': '_id', 
          'as': 'skills'
        }
      }
    ]).toArray()
    const total = await databaseService.jobs.countDocuments()
    console.log("TOTAL::", total)
    return {
      jobs,
      total
    }
  }
}
const jobService = new JobService();
export default jobService;