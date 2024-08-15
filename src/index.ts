import express from 'express'
import databaseService from './services/database.service'
import userRouter from './routes/users.routes'
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use('/users',userRouter)
// Connect to MongoDB
databaseService.connect()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
