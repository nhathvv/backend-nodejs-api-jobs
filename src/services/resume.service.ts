import { Resumes } from "~/models/schemas/Resumes.schema"
import databaseService from "./database.service"
import { ObjectId } from "mongodb"
import { ResumeStatus } from "~/constants/enum"
import { ErrorWithStatus } from "~/models/Errors"

class ResumeService {
  async createResume(payload: { creatorId: string; jobId: string }) {
    const checkExits = await databaseService.resumes.findOne({
      creatorId: new ObjectId(payload.creatorId),
      jobId: new ObjectId(payload.jobId)
    })
    if (checkExits) {
      throw new ErrorWithStatus({
        message: "Resume already exists",
        status: 400
      })
    }
    const resume = await databaseService.resumes.insertOne(
      new Resumes({
        creatorId: new ObjectId(payload.creatorId),
        jobId: new ObjectId(payload.jobId)
      })
    )
    return resume
  }
  async updateResume(resume_id: string, status: string) {
    const resume = await databaseService.resumes.updateOne(
      {
        _id: new ObjectId(resume_id)
      },
      {
        $set: {
          status: status as ResumeStatus
        },
        $currentDate: { updated_at: true }
      }
    )
    return resume
  }
  async getJobApplyByCreator(creatorId: string) {
    const [getJobApply] = await databaseService.resumes
      .aggregate([
        {
          $match: {
            creatorId: new ObjectId(creatorId)
          }
        },
        {
          $group: {
            _id: "$creatorId",
            jobIds: {
              $push: "$jobId"
            },
            total: {
              $sum: 1
            }
          }
        },
        {
          $lookup: {
            from: "jobs",
            localField: "jobIds",
            foreignField: "_id",
            as: "jobs"
          }
        },
        {
          $project: {
            jobIds: 0
          }
        }
      ])
      .toArray()
    return getJobApply || { _id: creatorId, total: 0, jobs: [] }
  }
  async getCreatorApplyByJob(jobId: string) {
    const [getCreatorApply] = await databaseService.resumes
      .aggregate([
        {
          $match: {
            jobId: new ObjectId(jobId)
          }
        },
        {
          $lookup: {
            from: "creators",
            localField: "creatorId",
            foreignField: "user_id",
            as: "creator"
          }
        },
        {
          $addFields: {
            creator: {
              $arrayElemAt: ["$creator", 0]
            }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "creator.user_id",
            foreignField: "_id",
            as: "creator.user"
          }
        },
        {
          $unwind: {
            path: "$creator.user",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "skills",
            localField: "creator.skills",
            foreignField: "_id",
            as: "creator.skills"
          }
        },
        {
          $group: {
            _id: "$jobId",
            creators: {
              $push: "$creator"
            },
            total: {
              $sum: 1
            }
          }
        },
        {
          $project: {
            "creators.user_id": 0,
            "creators.createdAt": 0,
            "creators.updatedAt": 0,
            "creators.user.password": 0,
            "creators.user.role": 0,
            "creators.user.creator_id": 0,
            "creators.skill_id": 0
          }
        }
      ])
      .toArray()
    return getCreatorApply || { _id: jobId, total: 0, creators: [] }
  }
  async getResumeById(resume_id: string) {
    const [resume] = await databaseService.resumes
      .aggregate([
        {
          $match: {
            _id: new ObjectId(resume_id)
          }
        },
        {
          $lookup: {
            from: "creators",
            localField: "creatorId",
            foreignField: "user_id",
            as: "creator"
          }
        },
        {
          $addFields: {
            creator: {
              $arrayElemAt: ["$creator", 0]
            }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "creator.user_id",
            foreignField: "_id",
            as: "creator.user"
          }
        },
        {
          $unwind: {
            path: "$creator.user",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "skills",
            localField: "creator.skills",
            foreignField: "_id",
            as: "creator.skills"
          }
        },
        {
          $lookup: {
            from: "jobs",
            localField: "jobId",
            foreignField: "_id",
            as: "job"
          }
        },
        {
          $addFields: {
            job: {
              $arrayElemAt: ["$job", 0]
            }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "job.user",
            foreignField: "_id",
            as: "job.user"
          }
        },
        {
          $unwind: {
            path: "$job.user",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "skills",
            localField: "job.skills",
            foreignField: "_id",
            as: "job.skills"
          }
        },
        {
          $project: {
            creatorId: 0,
            jobId: 0,
            "creator.user_id": 0,
            "creator.createdAt": 0,
            "creator.updated_at": 0,
            "creator.updatedAt": 0,
            "creator.user.password": 0,
            "creator.user.role": 0,
            "creator.user.creator_id": 0,
            "creator.skill_id": 0,
            "job.user.password": 0,
            "job.user.role": 0,
            "job.user.creator_id": 0
          }
        }
      ])
      .toArray()
    return resume
  }
}
const resumeService = new ResumeService()
export default resumeService
