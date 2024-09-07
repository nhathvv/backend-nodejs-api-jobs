<<<<<<< HEAD
import express from "express"
import databaseService from "./services/database.service"
import userRouter from "./routes/users.routes"
import cors from "cors"
import defaultErrorHandler from "./middlewares/errors.middlewares"
import jobRouter from "./routes/jobs.routes"
import searchRouter from "./routes/search.routes"
=======
import express from 'express'
import databaseService from './services/database.service'
import userRouter from './routes/users.routes'
import cors from 'cors'
import defaultErrorHandler from './middlewares/errors.middlewares'
import jobRouter from './routes/jobs.routes'
import searchRouter from './routes/search.routes'
>>>>>>> 50cf6f3f2cda8911da45bb18228fef8a8137e831
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
<<<<<<< HEAD
app.use("/users", userRouter)
app.use("/jobs", jobRouter)
app.use("/search", searchRouter)
=======
app.use('/users', userRouter)
app.use('/jobs', jobRouter)
app.use('/search', searchRouter)
>>>>>>> 50cf6f3f2cda8911da45bb18228fef8a8137e831

// Connect to MongoDB
databaseService.connect()
// Default error handler
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
