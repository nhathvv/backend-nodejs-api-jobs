import { hashPassword } from "~/utils/crypto"
import databaseService from "./database.service"
import { User } from "~/models/schemas/Users.schema"
class UserService {
  async register(payload : {fullname: string, email: string, password: string}) {
    const {fullname,email, password} = payload

    const checkEmailExist = await databaseService.users.findOne({email})
    if(checkEmailExist) {
      throw new Error('Email already exists')
    }
  console.log( hashPassword(password))
  const user = new User({
    fullname,
    email,
    password: hashPassword(password),
  })
  const result = await databaseService.users.insertOne(user)
  return result
  }
}
const userService = new UserService()
export default userService