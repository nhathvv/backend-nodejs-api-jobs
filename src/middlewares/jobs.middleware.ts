import { checkSchema } from "express-validator";
import { JobStatus, JobTypes, Levels } from "~/constants/enum";
import USERS_MESSAGES from "~/constants/messages";
import { Skill } from "~/models/request/Users.request";
import databaseService from "~/services/database.service";
import { validate } from "~/utils/validation";
/**
 *   name : string
  location: string
  salary : number
  quantity: number
  level : Levels
  status : JobStatus
  thumbnail: string
  type : JobTypes
  description : string
  skills : ObjectId[]
  start_date : Date
  end_date : Date
 */
export const JobReqValidator = validate(checkSchema({
 description : {
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 3, max: 500 },
      errorMessage: USERS_MESSAGES.DESCRIPTION_LENGTH_MUST_BE_FROM_3_TO_500
    },
  },
  end_date: {
    isISO8601: {
      options: { strict: true, strictSeparator: true },
      errorMessage: USERS_MESSAGES.END_DATE_MUST_BE_A_VALID_DATE
    },
  },
  level : {
    isString: true,
    notEmpty: true,
    isIn: {
      options: [Object.values(Levels)],
      errorMessage: USERS_MESSAGES.LEVEL_IS_INVALID
    }
  },
  location: {
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: USERS_MESSAGES.LOCATION_LENGTH_MUST_BE_FROM_3_TO_255
    },
  },
  name: {
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_3_TO_255
    },
  },
  salary : {
    isNumeric: true,
    notEmpty: true,
    errorMessage: USERS_MESSAGES.SALARY_MUST_BE_A_NUMBER
  },
  skills : {
    isArray: true,
    custom : {
      options: (skills: Skill[]) => {
        if (!skills.every((skill : any) => typeof skill === 'string')) {
          throw new Error(USERS_MESSAGES.SKILL_NAME_MUST_BE_STRING);
        }
        return true;
      }
    }
  },
  start_date: {
    isISO8601: {
      options: { strict: true, strictSeparator: true },
      errorMessage: USERS_MESSAGES.START_DATE_MUST_BE_A_VALID_DATE
    },
  },
  status: {
    isString: true,
    notEmpty: true,
    isIn: {
      options: [Object.values(JobStatus)],
      errorMessage: USERS_MESSAGES.STATUS_IS_INVALID
    }
  },
  thumbnail: {
    isString: true,
  },
  type: {
    isString: true,
    isIn: {
      options: [Object.values(JobTypes)],
      errorMessage: USERS_MESSAGES.TYPE_IS_INVALID
    }
  },
}, ['body']))
export const JobIdValidator = validate(checkSchema({
  jobId: {
    isMongoId: true,
    in: ['params'],
    custom: {
      options: async (value, { req }) => {
        const job = await databaseService.jobs.findOne({ _id: value });
        if (!job) {
          throw new Error(USERS_MESSAGES.JOB_NOT_FOUND);
        }
        return true;
      }
    }
  }
}))
export const paginationValidator = validate(
  checkSchema(
    {
      limit: {
        isNumeric: true,
        custom: {
          options: (value, { req }) => {
            const num = Number(value)
            if (num < 1 || num > 100) {
              throw new Error('Limit must be between 1 and 100')
            }
            return true
          }
        }
      },
      page: {
        isNumeric: true,
        custom: {
          options: (value, { req }) => {
            const num = Number(value)
            if (num < 1) {
              throw new Error('Page must be greater than 0')
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)