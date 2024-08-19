import { Request, Response } from 'express'
import { verifyToken } from '~/utils/jwt'

export const verifyAccessToken = async (access_token: string, req?: Request, res?: Response) => {
  if (!access_token) {
    return res!.status(401).json({
      message: 'Access token is required'
    })
  }
  const decoded_authorization = await verifyToken({
    token: access_token,
    secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
  })
  if (req) {
    req.decoded_authorization = decoded_authorization
    return true
  }
  return decoded_authorization
}