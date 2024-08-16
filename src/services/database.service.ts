import { Db, MongoClient, Collection } from 'mongodb'
import { config } from 'dotenv'
import { User } from '~/models/schemas/Users.schema'
import { RefreshTokens } from '~/models/schemas/refreshTokens.schema'
import { Creator } from '~/models/schemas/Creators.schema'
config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster.xhm85.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`
class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db('jobs-dev')
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.error('Error connecting to MongoDB:', error)
    }
  }
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_COLLECTION_USER as string)
  }
  get refreshTokens(): Collection<RefreshTokens> {
    return this.db.collection(process.env.DB_COLLECTION_REFRESH_TOKEN as string)
  }
  get creators(): Collection<Creator> {
    return this.db.collection(process.env.DB_COLLECTION_CREATOR as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService