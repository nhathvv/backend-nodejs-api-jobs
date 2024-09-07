import { Router } from "express"
import { searchController } from "~/controllers/jobs.controllers"
import { paginationValidator } from "~/middlewares/jobs.middleware"
import { searchValidator } from "~/middlewares/search.middleware"
import { accessTokenValidator } from "~/middlewares/users.middleware"
import { wrapRequestHandler } from "~/utils/handlers"
const searchRouter = Router()
/**
 * Description. Search
 * Path: /search
 * Method: GET
 * Query : {query : string, limit: string, page: string}
 * Headers : {Authorization : Bearer <access_token>}
 */
searchRouter.get("/", accessTokenValidator, paginationValidator, searchValidator, wrapRequestHandler(searchController))
export default searchRouter
