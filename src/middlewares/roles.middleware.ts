import { checkSchema } from "express-validator"
import { validate } from "~/utils/validation"

export const createRoleValidator = validate(checkSchema({}, ["body"]))
