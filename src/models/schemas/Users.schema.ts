import { ObjectId } from "mongodb"
import { Roles } from "~/constants/enum"
interface UserType {
  _id?: ObjectId
  fullname: string
  email: string
  password: string
  address?: string
  companies_id?: ObjectId
  role?: Roles
  creator_id?: ObjectId
  avatar?: string
  phone?: string
  created_at?: Date
  updated_at?: Date
}
export class User {
  _id?: ObjectId
  fullname: string
  email: string
  password: string
  address: string
  companies_id: ObjectId | null
  role: Roles
  phone?: string
  creator_id: ObjectId | null
  avatar: string
  created_at: Date
  updated_at: Date
  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.fullname = user.fullname
    this.email = user.email
    this.password = user.password
    this.address = user.address || ""
    ;(this.companies_id = user.companies_id || null),
      (this.role = user.role || Roles.USER),
      (this.creator_id = user.creator_id || null),
      (this.avatar = user.avatar || "")
    this.phone = user.phone || ""
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
  }
}
