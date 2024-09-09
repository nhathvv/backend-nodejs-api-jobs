import { ObjectId } from "mongodb"
import { Roles } from "~/constants/enum"

interface RoleType {
  name: string
  description: string
  permissions: ObjectId[]
  role_id?: Roles
  isActive: boolean
  created_at?: Date
  updated_at?: Date
}
export class Role {
  name: string
  description: string
  permissions: ObjectId[]
  isActive?: boolean
  role_id?: Roles
  created_at?: Date
  updated_at?: Date
  constructor(role: RoleType) {
    const date = new Date()
    this.name = role.name
    this.description = role.description
    this.permissions = role.permissions
    this.role_id = role.role_id
    this.isActive = role.isActive || true
    this.created_at = role.created_at || date
    this.updated_at = role.updated_at || date
  }
}
