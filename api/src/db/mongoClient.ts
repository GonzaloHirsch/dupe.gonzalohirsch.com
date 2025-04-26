import { MongoClient, ServerApiVersion } from 'mongodb';
import config from '../config/config';
import { DupeDatabaseClient } from './clients';

export class DupeMongoDBClient implements DupeDatabaseClient {
  private client: MongoClient | null;
  private static instance: DupeMongoDBClient | null = null;

  public constructor() {
    this.client = this.getClient();
  }

  /**
   * Getter for a singleton instance of the MongoDB client.
   * @returns {DupeMongoDBClient} - The singleton instance of the MongoDB client.
   */
  public static getInstance(): DupeMongoDBClient {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new DupeMongoDBClient();
    return this.instance;
  }

  /**
   * Getter for an actual MongoDB client.
   * @returns {MongoClient} - The MongoDB client instance.
   */
  private getClient(): MongoClient {
    if (this.client) {
      return this.client;
    }
    const uri = config.db.uri as string;
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
