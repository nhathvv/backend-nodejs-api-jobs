import { Request } from "express";
import { checkSchema } from "express-validator";
import { validate } from "~/utils/validation";
import { verifyAccessToken } from "./common.middleware";
import USERS_MESSAGES from "~/constants/messages";
import { hashPassword } from "~/utils/crypto";
import databaseService from "~/services/database.service";
import { Skill } from "~/models/request/Users.request";

export const registerValidator = validate(checkSchema({
  fullname: {
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: USERS_MESSAGES.FULLNAME_LENGTH_MUST_BE_FROM_3_TO_100
    },
  },
  email: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
    },
    isEmail: {
      errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
    },
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: USERS_MESSAGES.EMAIL_LENGTH_MUST_BE_FROM_3_TO_100
    },
    trim: true,
    custom: {
      options: async (value) => {
        const user = await databaseService.users.findOne({ email: value })
        if (user) {
          throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS)
        }
        return true
      }
    }
  },
  password: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
    },
    isLength: {
      options: { min: 6, max: 100 },
      errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    },
    trim: true,
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      },
      errorMessage: USERS_MESSAGES.MUST_BE_STRONG
    }
  },
  confirmPassword: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
    },
    isLength: {
      options: { min: 6, max: 100 },
      errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    },
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      },
      errorMessage: USERS_MESSAGES.MUST_BE_STRONG
    },
    trim: true,
    custom: {
      options: (value, { req }) => value === req.body.password,
      errorMessage: USERS_MESSAGES.PASSWORD_CONFIRMATION_DOES_NOT_MATCH_PASSWORD
    }
  }
}, ['body']))
export const loginValidator = validate(checkSchema({
  email: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
    },
    isEmail: {
      errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
    },
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: USERS_MESSAGES.EMAIL_LENGTH_MUST_BE_FROM_3_TO_100
    },
    trim: true,
    custom: {
      options: async (value, { req }) => {
        const user = await databaseService.users.findOne({
          email: value,
          password: hashPassword(req.body.password)
        })
        if (user === null) {
          throw new Error(USERS_MESSAGES.USER_PASSWORD_IS_INCORRECT)
        }
        req.user = user
        return true
      }
    }
  },
  password: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
    },
    isLength: {
      options: { min: 6, max: 50 },
      errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    },
    trim: true,
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      },
      errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
    }
  }
}, ['body']))

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value, { req }) => {
            const access_token = (value || '').split(' ')[1]
            await verifyAccessToken(access_token, req as Request)
          }
        }
      }
    },
    ['headers']
  )
)

export const updateMeValidator = validate(checkSchema({
  email: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
    },
    isEmail: {
      errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
    },
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: USERS_MESSAGES.EMAIL_LENGTH_MUST_BE_FROM_3_TO_100
    },
    trim: true,
    custom: {
      options: async (value, { req }) => {
        const user = await databaseService.users.findOne({ email: value });
        const user_id = req.decoded_authorization.user_id;
        if (user && user._id.toString() !== user_id) {
          throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS);
        }
        return true;
      }
    }
  },
  skills: {
    isArray: {
      errorMessage: USERS_MESSAGES.SKILLS_MUST_BE_AN_ARRAY
    },
    custom: {
      options: (skills: Skill[]) => {
        if (!skills.every((skill : any) => typeof skill === 'string')) {
          throw new Error(USERS_MESSAGES.SKILL_NAME_MUST_BE_STRING);
        }
        return true;
      }
    }
  }
}));