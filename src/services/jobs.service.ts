import databaseService from "./database.service";
import { Job } from "~/models/schemas/Jobs.schema";
import { JobReqBody } from "~/models/request/Jobs.request";
import { ObjectId } from "mongodb";
import userService from "./users.service";


class JobService {
  async createJob(user_id:string, payload : JobReqBody) {
    const skills = await userService.checkAndCreateSkill(payload.skills)
    const job = await databaseService.jobs.insertOne(
      new Job({
        ...payload,
        skills,
        user_id : new ObjectId(user_id),
      }),
    )
    return job
  }
}
const jobService = new JobService();
export default jobService;