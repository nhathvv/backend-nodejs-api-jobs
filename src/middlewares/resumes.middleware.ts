import { Request, Response, NextFunction } from "express"
import { checkSchema } from "express-validator"
import { ObjectId } from "mongodb"
import { ResumeStatus } from "~/constants/enum"
import databaseService from "~/services/database.service"
import { validate } from "~/utils/validation"
export const resumesValidator = validate(
  checkSchema(
    {
      jobId: {
        custom: {
          options: async (value) => {
            const job = await databaseService.jobs.findOne({ _id: new ObjectId(value) })
            if (!job) {
              throw new Error("Job not found")
            }
            return true
          }
        }
      }
    },
    ["body"]
  )
)
export const updateResumeValidator = validate(
  checkSchema(
    {
      status: {
        isIn: {
          options: [[ResumeStatus.PENDING, ResumeStatus.REVIEWING, ResumeStatus.APPROVED, ResumeStatus.REJECTED]],
          errorMessage: "Status must be one of pending, approved, rejected"
        },
        notEmpty: {
          errorMessage: "Status is required"
        }
      }
    },
    ["body"]
  )
)
