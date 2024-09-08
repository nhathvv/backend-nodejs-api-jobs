import { Router } from "express"
import { searchBySkillController, searchController } from "~/controllers/jobs.controllers"
import { paginationValidator } from "~/middlewares/jobs.middleware"
import { searchValidator } from "~/middlewares/search.middleware"
import { wrapRequestHandler } from "~/utils/handlers"
const searchRouter = Router()
/**
 * Description. Search
 * Path: /search
 * Method: GET
 * Query : {query : string, limit: string, page: string}
 * Headers : {Authorization : Bearer <access_token>}
 */
searchRouter.get("/", searchValidator, wrapRequestHandler(searchController))
/**
 * Description. Search by skill
 * Path: /search/skills
 * Method: GET
 * Query : {query : string, limit: string, page: string}
 */
searchRouter.get("/skills", paginationValidator, wrapRequestHandler(searchBySkillController))
export default searchRouter
