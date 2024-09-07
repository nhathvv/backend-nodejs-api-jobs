import { JobStatus, JobTypes, Levels } from '~/constants/enum'

export interface JobReqBody {
  name: string
  location: string
  salary: number
  quantity: number
  level: Levels
  status: JobStatus
  thumbnail: string
  type: JobTypes
  description: string
  skills: string[]
  start_date: Date
  end_date: Date
}
