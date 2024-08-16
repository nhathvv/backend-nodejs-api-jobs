import { ObjectId } from "mongodb";
import { Level } from "~/constants/enum";

interface CreatorType {
  _id?: ObjectId,
  user_id : ObjectId
  skill_id? : ObjectId[]
  level? : Level
  rating? : string
  createdAt? : Date
  updatedAt? : Date
}
export class Creator {
  _id?: ObjectId
  user_id : ObjectId
  skill_id : ObjectId[] | null
  level? : Level | null
  rating? : string
  createdAt? : Date
  updatedAt? : Date
  constructor(creator: CreatorType) {
    const date = new Date()
    this._id = creator._id
    this.skill_id = creator.skill_id || null
    this.level = creator.level || null
    this.rating = creator.rating || ''
    this.user_id = creator.user_id
    this.createdAt = creator.createdAt || date
    this.updatedAt = creator.updatedAt || date
  }
}