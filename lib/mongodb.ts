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
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      connectTimeoutMS: 6_000,
      serverSelectionTimeoutMS: 6_000,
      socketTimeoutMS: 20_000
    });
    globalForMongo.ajcMongoClientPromise = client.connect().catch(async (error) => {
      globalForMongo.ajcMongoClientPromise = undefined;
      await client.close().catch(() => undefined);
      throw error;
    });
  }

  const client = await globalForMongo.ajcMongoClientPromise;
  return client.db(process.env.MONGODB_DB?.trim() || "ajc_media");
}
