<<<<<<< HEAD
import { Router } from "express"
import { searchController } from "~/controllers/jobs.controllers"
import { paginationValidator } from "~/middlewares/jobs.middleware"
import { searchValidator } from "~/middlewares/search.middleware"
import { accessTokenValidator } from "~/middlewares/users.middleware"
import { wrapRequestHandler } from "~/utils/handlers"
=======
import { Router } from 'express'
import { searchController } from '~/controllers/jobs.controllers'
import { paginationValidator } from '~/middlewares/jobs.middleware'
import { searchValidator } from '~/middlewares/search.middleware'
import { accessTokenValidator } from '~/middlewares/users.middleware'
import { wrapRequestHandler } from '~/utils/handlers'
>>>>>>> 50cf6f3f2cda8911da45bb18228fef8a8137e831
const searchRouter = Router()
/**
 * Description. Search
 * Path: /search
 * Method: GET
 * Query : {query : string, limit: string, page: string}
 * Headers : {Authorization : Bearer <access_token>}
 */
<<<<<<< HEAD
searchRouter.get("/", accessTokenValidator, paginationValidator, searchValidator, wrapRequestHandler(searchController))
=======
searchRouter.get('/', accessTokenValidator, paginationValidator, searchValidator, wrapRequestHandler(searchController))
>>>>>>> 50cf6f3f2cda8911da45bb18228fef8a8137e831
export default searchRouter
