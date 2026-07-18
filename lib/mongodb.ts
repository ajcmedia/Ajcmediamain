import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  ajcMongoClientPromise?: Promise<MongoClient>;
};

export class DatabaseConfigurationError extends Error {
  constructor() {
    super("MongoDB is not configured. Add MONGODB_URI to the environment.");
    this.name = "DatabaseConfigurationError";
  }
}

export function hasMongoConfiguration() {
  return Boolean(process.env.MONGODB_URI?.trim());
}

export async function getDatabase(): Promise<Db> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new DatabaseConfigurationError();
  }

  if (!globalForMongo.ajcMongoClientPromise) {
    const client = new MongoClient(uri, { maxPoolSize: 10 });
    globalForMongo.ajcMongoClientPromise = client.connect();
  }

  const client = await globalForMongo.ajcMongoClientPromise;
  return client.db(process.env.MONGODB_DB?.trim() || "ajc_media");
}
