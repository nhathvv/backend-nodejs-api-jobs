import { PermissionReqBody } from "~/models/request/Permissions.request"
import databaseService from "./database.service"
import { Permission } from "~/models/schemas/Permissions.schema"
import { ObjectId } from "mongodb"

class PermissionService {
  async createPermission(payload: PermissionReqBody) {
    const permission = await databaseService.permissions.insertOne(new Permission(payload))
    return permission
  }
  async updatePermission(permission_id: string, payload: PermissionReqBody) {
    const permission = await databaseService.permissions.findOneAndUpdate(
      { _id: new ObjectId(permission_id) },
      { $set: payload },
      { returnDocument: "after" }
    )
    return permission
  }
  async deletePermission(permission_id: string) {
    const result = await databaseService.permissions.deleteOne({ _id: new ObjectId(permission_id) })
    return result
  }
  async getPermission(permission_id: string) {
    const permission = await databaseService.permissions.findOne({ _id: new ObjectId(permission_id) })
    return permission
  }
}
const permissionService = new PermissionService()
export default permissionService
