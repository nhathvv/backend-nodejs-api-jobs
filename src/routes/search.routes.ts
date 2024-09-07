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
<<<<<<< HEAD
searchRouter.get("/", searchValidator, wrapRequestHandler(searchController))
/**
 * Description. Search by skill
 * Path: /search/skills
 * Method: GET
 * Query : {query : string, limit: string, page: string}
 */
searchRouter.get("/skills", paginationValidator, wrapRequestHandler(searchBySkillController))
=======
searchRouter.get("/", accessTokenValidator, paginationValidator, searchValidator, wrapRequestHandler(searchController))
>>>>>>> 2d265b6a88bd04869f6a87047951ec76dfde66b8
export default searchRouter
