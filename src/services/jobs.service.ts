import databaseService from "./database.service"
import { Job } from "~/models/schemas/Jobs.schema"
import { JobReqBody } from "~/models/request/Jobs.request"
import { ObjectId } from "mongodb"
import userService from "./users.service"
import { add } from "lodash"

class JobService {
  async createJob(user_id: string, payload: JobReqBody) {
    const skills = await userService.checkAndCreateSkill(payload.skills)
    const job = await databaseService.jobs.insertOne(
      new Job({
        ...payload,
        skills,
        user_id: new ObjectId(user_id)
      })
    )
    return job
  }
  async updateJob(user_id: string, job_id: string, payload: JobReqBody) {
    const skills = await userService.checkAndCreateSkill(payload.skills)
    await databaseService.jobs.findOneAndUpdate(
      {
        _id: new ObjectId(job_id)
      },
      {
        $set: {
          ...payload,
          skills
        }
      },
      {
        returnDocument: "after"
      }
    )
    const [result] = await databaseService.jobs
      .aggregate([
        {
          $match: {
            _id: new ObjectId("66c87e389edafe49db773e8e")
          }
        },
        {
          $lookup: {
            from: "skills",
            localField: "skills",
            foreignField: "_id",
            as: "skills"
          }
        }
      ])
      .toArray()
    return result
  }
  async deleteJob(user_id: string, job_id: string) {
    const result = await databaseService.jobs.deleteOne({
      _id: new ObjectId(job_id),
      user: new ObjectId(user_id)
    })
    return result
  }
  async getJob(job_id: string) {
    const [job] = await databaseService.jobs
      .aggregate([
        {
          $match: {
            _id: new ObjectId(job_id)
          }
        },
        {
          $lookup: {
            from: "skills",
            localField: "skills",
            foreignField: "_id",
            as: "skills"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $addFields: {
            user: {
              $arrayElemAt: ["$user", 0]
            }
          }
        },
        {
          $project: {
            user: {
              password: 0,
              role: 0,
              creator_id: 0,
              created_at: 0,
              updated_at: 0,
              companies_id: 0
            }
          }
        }
      ])
      .toArray()
    return job
  }
  async getJobsPagination(page: number, limit: number) {
    const jobs = await databaseService.jobs
      .aggregate([
        {
          $skip: (page - 1) * limit
        },
        {
          $limit: limit
        },
        {
          $lookup: {
            from: "skills",
            localField: "skills",
            foreignField: "_id",
            as: "skills"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $addFields: {
            user: {
              $arrayElemAt: ["$user", 0]
            }
          }
        }
      ])
      .toArray()
    const total = await databaseService.jobs.countDocuments()
    console.log("TOTAL::", total)
    return {
      jobs,
      total
    }
  }
  async search({ content }: { content: string }) {
    const jobs = await databaseService.jobs
      .aggregate([
        {
          $match: {
            name: {
              $regex: content,
              $options: "i"
            }
          }
        },
        {
          $lookup: {
            from: "skills",
            localField: "skills",
            foreignField: "_id",
            as: "skills"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $addFields: {
            user: {
              $arrayElemAt: ["$user", 0]
            }
          }
        },
        {
          $project: {
            user: {
              password: 0,
              role: 0,
              creator_id: 0,
              email: 0,
              address: 0,
              avatar: 0,
              created_at: 0,
              updated_at: 0,
              phone: 0,
              companies_id: 0
            }
          }
        }
      ])
      .toArray()
    return jobs
  }
  async searchBySkill({ skill_type, page, limit }: { skill_type: string; limit: number; page: number }) {
    console.log("SKILL_TYPE", skill_type)
    const jobs = await databaseService.skills
      .aggregate([
        {
          $match: {
            name: skill_type
          }
        },
        {
          $lookup: {
            from: "jobs",
            localField: "_id",
            foreignField: "skills",
            as: "jobs"
          }
        },
        {
          $skip: (page - 1) * limit
        },
        {
          $limit: limit
        },
        {
          $lookup: {
            from: "skills",
            localField: "jobs.skills",
            foreignField: "_id",
            as: "skills"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "jobs.user",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $addFields: {
            user: {
              $arrayElemAt: ["$user", 0]
            }
          }
        },
        {
          $project: {
            user: {
              password: 0,
              role: 0,
              creator_id: 0,
              email: 0,
              address: 0,
              avatar: 0,
              created_at: 0,
              updated_at: 0,
              phone: 0,
              companies_id: 0
            }
          }
        }
      ])
      .toArray()
    console.log("JOBS", jobs)
    return jobs[0]
  }
}
const jobService = new JobService()
export default jobService
