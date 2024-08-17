import { JwtPayload } from "jsonwebtoken"
import { TokenTypes } from "~/constants/enum"
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
export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenTypes
  exp: number
  iat: number
}
