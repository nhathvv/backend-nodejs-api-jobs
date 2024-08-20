import { JwtPayload } from "jsonwebtoken"
import { Levels, TokenTypes } from "~/constants/enum"
export interface RegisterReqBody {
  fullname: string
  email: string
  password: string
  role: number
}
export interface LoginReqBody {
  email: string
  password: string
}
export interface UpdateMeReqBody {
  fullname : string
  email : string,
  level : Levels,
  skills : string[],
  address : string,
  phone : string,
}
export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenTypes
  exp: number
  iat: number
}
export interface Skill {
  _id? : string,
  name : string,
  description? : string,
  createdAt? : Date,
  updatedAt? : Date
}