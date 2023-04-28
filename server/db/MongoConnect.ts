import { connect } from 'mongoose'

class MongoConnection {
    private static instance: MongoConnection;
    private db_uri: string | undefined;
  
    private constructor() {
      // Private constructor to prevent instantiation outside of the class
      this.db_uri = process.env.ATLAS_URI;
    }
  
    public static getInstance(): MongoConnection {
      if (!MongoConnection.instance) {
        MongoConnection.instance = new MongoConnection();
      }
      return MongoConnection.instance;
    }
  
    public async connectToDb(): Promise<void> {
      await connect(`${this.db_uri}`)
        .then(() => console.log(`Connected to Mongodb on ${this.db_uri}`))
        .catch((error) => console.error(`Error connecting to Mongodb: ${error}`));
    }
}
  
export default MongoConnection;