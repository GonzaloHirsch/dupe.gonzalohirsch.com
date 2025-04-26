import { MongoClient, ServerApiVersion } from 'mongodb';
import { DupeDatabaseClient } from './clients';

export class DupeMongoDBClient implements DupeDatabaseClient {
  private database: string;
  private client: MongoClient | null;
  private static instance: DupeMongoDBClient | null = null;

  public constructor(uri: string, database: string) {
    this.client = this.getClient(uri);
    this.database = database;
  }

  /**
   * Getter for a singleton instance of the MongoDB client.
   * @returns {DupeMongoDBClient} - The singleton instance of the MongoDB client.
   */
  public static getInstance(uri: string, database: string): DupeMongoDBClient {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new DupeMongoDBClient(uri, database);
    return this.instance;
  }

  /**
   * Getter for an actual MongoDB client.
   * @returns {MongoClient} - The MongoDB client instance.
   */
  private getClient(uri: string): MongoClient {
    if (this.client) {
      return this.client;
    }
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    return this.client;
  }
}
