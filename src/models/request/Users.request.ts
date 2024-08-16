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