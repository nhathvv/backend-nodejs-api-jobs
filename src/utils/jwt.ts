import jwt, { SignOptions } from 'jsonwebtoken'
export const signToken = ({
  payload,
  privateKey = process.env.JWT_PRIVATE_KEY as string,
  options = {
    algorithm: 'HS256'
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