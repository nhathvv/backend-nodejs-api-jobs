<<<<<<< HEAD
import { checkSchema } from "express-validator"
import USERS_MESSAGES from "~/constants/messages"
import { validate } from "~/utils/validation"
=======
import { checkSchema } from 'express-validator'
import USERS_MESSAGES from '~/constants/messages'
import { validate } from '~/utils/validation'
>>>>>>> 50cf6f3f2cda8911da45bb18228fef8a8137e831

export const searchValidator = validate(
  checkSchema(
    {
      content: {
        isString: {
          errorMessage: USERS_MESSAGES.INVALID_CONTENT
        }
      }
    },
<<<<<<< HEAD
    ["query"]
=======
    ['query']
>>>>>>> 50cf6f3f2cda8911da45bb18228fef8a8137e831
  )
)
