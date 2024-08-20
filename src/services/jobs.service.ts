import databaseService from "./database.service";
import { Job } from "~/models/schemas/Jobs.schema";
import { JobReqBody } from "~/models/request/Jobs.request";
import { ObjectId } from "mongodb";

class JobService {
  async createJob(creator_id:string, payload : JobReqBody) {
    const job = await databaseService.jobs.insertOne(
      new Job({
        ...payload,
        creator_id : new ObjectId(creator_id)
      }),
    )
    return job
  }
}
const jobService = new JobService();
export default jobService;