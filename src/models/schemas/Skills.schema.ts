import { ObjectId } from "mongodb";

interface SkillType {
  _id?: ObjectId,
  name: string,
  description?: string,
  createdAt?: Date,
  updatedAt?: Date
}
export class Skill {
  _id?: ObjectId
  name?: string
  description?: string
  createdAt: Date
  updatedAt: Date
  constructor(skill: SkillType) {
    const date = new Date()
    this._id = skill._id || new ObjectId()
    this.name = skill.name || ''
    this.description = skill.description || ''
    this.createdAt = skill.createdAt || date
    this.updatedAt = skill.updatedAt || date
  }
}
