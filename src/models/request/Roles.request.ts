import { ObjectId } from "mongodb"

export interface RoleReqBody {
  name: string
  description: string
  isActive: boolean
  permissions: ObjectId[]
}
