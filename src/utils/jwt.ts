import jwt, { SignOptions } from "jsonwebtoken"
import { TokenPayload } from "~/models/request/Users.request"
export const signToken = ({
  payload,
  privateKey = process.env.JWT_PRIVATE_KEY as string,
  options = {
    algorithm: "HS256"
  }
}: {
  payload: string | object | Buffer
  privateKey?: string
  options?: SignOptions
}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}
export const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: string }) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (err, decoded) => {
      if (err) {
        throw reject(err)
      } else {
        resolve(decoded as TokenPayload)
      }
    })
  })
}
