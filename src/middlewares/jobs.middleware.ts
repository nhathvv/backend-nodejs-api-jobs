import { checkSchema } from "express-validator";
import USERS_MESSAGES from "~/constants/messages";
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
export const createJobValidator = validate(checkSchema({
  name : {
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_3_TO_255
    }
  },
  location: {
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: USERS_MESSAGES.LOCATION_LENGTH_MUST_BE_FROM_3_TO_255
    }
  },
  salary : {
    isNumeric: {
      errorMessage: USERS_MESSAGES.SALARY_MUST_BE_A_NUMBER
    }
  },
  quantity: {
    isNumeric: {
      errorMessage: USERS_MESSAGES.QUANTITY_MUST_BE_A_NUMBER
    }
  },
  thumbnail: {
    isString: true,
  },
  description : {
    isString: true,
  },
}, ['body']))