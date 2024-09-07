import express from "express"
import { validationResult, checkSchema, ValidationChain } from "express-validator"
import HTTP_STATUS from "~/constants/httpStatus"
import { EntityError, ErrorWithStatus } from "~/models/Errors"

export const validate = (validation: ValidationChain[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await Promise.all(validation.map((validation) => validation.run(req)))
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const objectErrors = errors.mapped()
    const entityError = new EntityError({ errors: {} })
    for (const key in objectErrors) {
      const msg = objectErrors[key].msg
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      entityError.errors[key] = objectErrors[key]
    }
    return next(entityError)
  }
}
