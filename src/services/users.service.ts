import { hashPassword } from "~/utils/crypto"
import databaseService from "./database.service"
import { User } from "~/models/schemas/Users.schema"
import { signToken } from "~/utils/jwt"
import { ObjectId } from "mongodb"
import { RefreshTokens } from "~/models/schemas/RefreshTokens.schema"
import { LoginReqBody, RegisterReqBody } from "~/models/request/Users.request"
import { Roles } from "~/constants/enum"
import { Creator } from "~/models/schemas/Creators.schema"
import USERS_MESSAGES from "~/constants/messages"
import { ErrorWithStatus } from "~/models/Errors"
import HTTP_STATUS from "~/constants/httpStatus"
class UserService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id },
      options: {
        expiresIn: '5m'
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
  if(payload.role === Roles.CREATOR) {
    const creator = new Creator({
      user_id: new ObjectId(user_id),
    })
    const result = await databaseService.creators.insertOne(creator)
    const creator_id = result.insertedId.toString()
    await databaseService.users.updateOne({_id: new ObjectId(user_id)}, {
      $set: {
        creator_id: new ObjectId(creator_id) as ObjectId
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
  async getMe(user_id: string) {
    const [user] = await databaseService.users.aggregate([
      {
        '$match': {
          '_id': new ObjectId(user_id)
        }
      },
      {
        '$lookup': {
          'from': 'creators',
          'localField': 'creator_id',
          'foreignField': '_id',
          'as': 'creator'
        }
      },
      {
        '$project': {
          'password': 0,
          'role': 0,
          'creator_id': 0
        }
      }
    ]).toArray();
    if(!user) {
      throw new ErrorWithStatus({message: USERS_MESSAGES.USER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND})
    }
    return user      
  }
  async updateMe(user_id: string, payload: any) {
    const user = await databaseService.users.findOne({_id: new ObjectId(user_id)})
    if(!user) {
      throw new ErrorWithStatus({message: USERS_MESSAGES.USER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND})
    }
    if(payload.email) {
      const checkEmailExist = await databaseService.users.findOne({email: payload.email})
      if(checkEmailExist) {
        throw new ErrorWithStatus({message: USERS_MESSAGES.EMAIL_ALREADY_EXISTS, status: HTTP_STATUS.CONFLICT})
      }
    }
    await databaseService.users.updateOne({_id: new ObjectId(user_id)}, {
      $set: {
        email: payload.email,
        fullname: payload.fullname,
        address: payload.address,
        avatar: payload.avatar,
        phone: payload.phone
      },
      $currentDate: { updated_at: true }
    })
    const creator = await databaseService.creators.findOne({user_id: new ObjectId(user_id)})
    if(creator) {
      await databaseService.creators.updateOne({user_id: new ObjectId(user_id)}, {
        $set: {
          skill_id: payload.skill_id,
          level: payload.level
        },
        $currentDate: { updated_at: true }
      })
    }
    const [result] = await databaseService.users.aggregate([
      {
        '$match': {
          '_id': new ObjectId(user_id)
        }
      },
      {
        '$lookup': {
          'from': 'creators',
          'localField': 'creator_id',
          'foreignField': '_id',
          'as': 'creator'
        }
      },
      {
        '$project': {
          'password': 0,
          'role': 0,
          'creator_id': 0
        }
      }
    ]).toArray();
    return result
  }
}
const userService = new UserService()
export default userService