import { checkSchema } from "express-validator";
import { validate } from "~/utils/validation";

export const registerValidator = validate(checkSchema({
  fullname: {
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 3, max: 100 }
    },
  },
  email: {
    notEmpty: true,
      isEmail: true,
      isLength: {
        options: { min: 3, max: 100 }
      },
    trim: true,
    errorMessage: 'Invalid email'
  },
  password: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: { min: 6, max: 100 }
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
      errorMessage:
        'Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    }
  },
  confirm_password: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: { min: 6, max: 100 }
    },
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      },
      errorMessage:
        'Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    },
    trim: true,
    custom: {
      options: (value, { req }) => value === req.body.password,
      errorMessage: 'Password confirmation does not match password'
    }
  }
}, ['body']))