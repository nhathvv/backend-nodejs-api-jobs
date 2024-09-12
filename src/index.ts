import express from "express"
import databaseService from "./services/database.service"
import userRouter from "./routes/users.routes"
import cors from "cors"
import defaultErrorHandler from "./middlewares/errors.middlewares"
import jobRouter from "./routes/jobs.routes"
import searchRouter from "./routes/search.routes"
import permissionsRouter from "./routes/permissions.routes"
import rolesRouter from "./routes/roles.routes"
import resumesRouter from "./routes/resumes.routes"
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use("/users", userRouter)
app.use("/jobs", jobRouter)
app.use("/search", searchRouter)
app.use("/permissions", permissionsRouter)
app.use("/roles", rolesRouter)
app.use("/resumes", resumesRouter)

// Connect to MongoDB
databaseService.connect()
// Default error handler
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
