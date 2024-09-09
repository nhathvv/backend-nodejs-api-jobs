import { checkSchema } from "express-validator"
import { ObjectId } from "mongodb"
import databaseService from "~/services/database.service"
import { validate } from "~/utils/validation"

export const createPermissionValidator = validate(
  checkSchema(
    {
      name: {
        isString: true,
        errorMessage: "Name must be a string",
        notEmpty: true
      },
      description: {
        isString: true,
        errorMessage: "Description must be a string"
      },
      path: {
        isString: true,
        errorMessage: "Path must be a string"
      },
      method: {
        isString: true,
        errorMessage: "Method must be a string",
        custom: {
          options: async (value, { req }) => {
            const isExist = await databaseService.permissions.findOne({ path: req.body.path, method: value })
            if (isExist) {
              throw new Error("Permission already exists")
            }
            return true
          }
        }
      }
    },
    ["body"]
  )
)
export const updatePermissionValidator = validate(
  checkSchema(
    {
      permissionId: {
        isMongoId: true,
        in: ["params"],
        custom: {
          options: async (value) => {
            console.log("value", value)
            const permission = await databaseService.permissions.findOne({ _id: new ObjectId(value) })
            if (!permission) {
              throw new Error("Permission not found")
            }
            return true
          }
        }
      },
      name: {
        isString: true,
        errorMessage: "Name must be a string",
        notEmpty: true
      },
      description: {
        isString: true,
        errorMessage: "Description must be a string"
      },
      path: {
        isString: true,
        errorMessage: "Path must be a string"
      },
      method: {
        isString: true,
        errorMessage: "Method must be a string",
        custom: {
          options: async (value, { req }) => {
            const permission_id = req.params?.permissionId
            const isExist = await databaseService.permissions.findOne({
              path: req.body.path,
              method: value,
              _id: { $ne: new ObjectId(permission_id) } // exclude current permission
            })
            if (isExist) {
              throw new Error("Permission already exists")
            }
            return true
          }
        }
      }
    },
    ["body"]
  )
)
export const checkIdPermissionValidator = validate(
  checkSchema(
    {
      permissionId: {
        custom: {
          options: async (value) => {
            const permission = await databaseService.permissions.findOne({ _id: new ObjectId(value) })
            if (!permission) {
              throw new Error("Permission not found")
            }
            return true
          }
        }
      }
    },
    ["params"]
  )
)
