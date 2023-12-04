import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  //..... In development mode, use a global variable so that the value
  //........ is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  //........ In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

//...... Export a module-scoped MongoClient promise. By doing this in a
//....... separate module, the client can be shared across functions.
export default clientPromise

// import mongoose, { Connection } from 'mongoose';
// import { MongoClient } from 'mongodb';

// const MONGODB_URI = process.env.MONGODB_URI as string;

// let connection: Connection;

// const init = async (): Promise<MongoClient> => {
//   if (connection) {
//     return connection as MongoClient;
//   }

//   try {
//     const mongoClient = await mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     });
//     console.log('Connected to MongoDB');
//     return mongoClient.connection.getClient(); // Return the MongoDB client
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// };

// export default init;
