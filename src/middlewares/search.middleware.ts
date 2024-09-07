import { checkSchema } from 'express-validator'
import USERS_MESSAGES from '~/constants/messages'
import { validate } from '~/utils/validation'

export const searchValidator = validate(
  checkSchema(
    {
      content: {
        isString: {
          errorMessage: USERS_MESSAGES.INVALID_CONTENT
        }
      }
    },
    ['query']
  )
)
