import { Request, Response, NextFunction } from "express"
import { checkSchema } from "express-validator"
import { ObjectId } from "mongodb"
import databaseService from "~/services/database.service"
import { validate } from "~/utils/validation"
export const resumesValidator = validate(
  checkSchema(
    {
      jobId: {
        isMongoId: {
          errorMessage: "JobId must be a valid ObjectId"
        },
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
