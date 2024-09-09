import { RoleReqBody } from "~/models/request/Roles.request"
import databaseService from "./database.service"
import { Role } from "~/models/schemas/Roles.schema"
import { ObjectId } from "mongodb"

class RoleService {
  async createRole(payload: RoleReqBody) {
    const role = await databaseService.roles.insertOne(
      new Role({
        ...payload,
        permissions: payload.permissions.map((permission) => new ObjectId(permission))
      })
    )
    return role
  }
}
const roleService = new RoleService()
export default roleService
