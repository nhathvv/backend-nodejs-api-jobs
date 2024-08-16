import { hashPassword } from "~/utils/crypto"
import databaseService from "./database.service"
import { User } from "~/models/schemas/Users.schema"
import { signToken } from "~/utils/jwt"
import { ObjectId } from "mongodb"
import { RefreshTokens } from "~/models/schemas/refreshTokens.schema"
import { LoginReqBody, RegisterReqBody } from "~/models/request/Users.request"
import { Role } from "~/constants/enum"
import { Creator } from "~/models/schemas/Creators.schema"
class UserService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id },
      options: {
        expiresIn: '15m'
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id },
      options: {
        expiresIn: '100d'
      }
    })
  }
  async register(payload : RegisterReqBody) {
    const checkEmailExist = await databaseService.users.findOne({email: payload.email})
    if(checkEmailExist) {
      throw new Error('Email already exists')
    }
  const user = new User({
   ...payload,
    password: hashPassword(payload.password)
  })
  const result = await databaseService.users.insertOne(user)
  const user_id = result.insertedId.toString()
  if(payload.role === Role.CREATOR) {
    const creator = new Creator({
      user_id: new ObjectId(user_id),
    })
    const result = await databaseService.creators.insertOne(creator)
    const creator_id = result.insertedId.toString()
    await databaseService.users.updateOne({_id: new ObjectId(user_id)}, {
      $set: {
        creator_id: new ObjectId(creator_id)
      }
    })
  }
  const [access_token, refresh_token] = await Promise.all([
    this.signAccessToken(user_id) as Promise<string>,
    this.signRefreshToken(user_id) as Promise<string>
  ])
  await databaseService.refreshTokens.insertOne(
    new RefreshTokens({
      user_id: new ObjectId(user_id),
      token: refresh_token
    }))
  
  return {
    access_token,
    refresh_token
  }
  }
  async login(payload: LoginReqBody) {
    const user = await databaseService.users.findOne({email: payload.email})
    if(!user) {
      throw new Error('User not found')
    }
    if(user.password !== hashPassword(payload.password)) {
      throw new Error('Password is incorrect')
    }
    const user_id = user._id.toString()
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id) as Promise<string>,
      this.signRefreshToken(user_id) as Promise<string>
    ])
    await databaseService.refreshTokens.insertOne(
      new RefreshTokens({
        user_id: new ObjectId(user_id),
        token: refresh_token
      }))
    return {
      access_token,
      refresh_token
    }
  }
}
const userService = new UserService()
export default userService