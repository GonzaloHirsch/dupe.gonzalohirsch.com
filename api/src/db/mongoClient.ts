import { Collection, MongoClient, ServerApiVersion, Document } from 'mongodb';
import { DupeDatabaseClient } from './clients';
import { ISchemaProduct } from '../models/schemaProduct';
import { MissingDatabaseClientError } from '../errors/configurationErrors';
import { IDBSchemaProduct } from '../models/db';

enum Collections {
  SCHEMA_PRODUCT = 'schemaProduct',
}

export class DupeMongoDBClient implements DupeDatabaseClient {
  private database: string;
  private client: MongoClient | null;
  private static instance: DupeMongoDBClient | null = null;

  public constructor(uri: string, database: string) {
    this.client = this.getClient(uri);
    this.database = database;
  }

  /**
   * Getter for the MongoDB collection.
   * @param collection - The name of the collection to get.
   * @returns an instance of the given collection.
   */
  private getCollection<DocumentType extends Document>(
    collection: Collections,
  ): Collection<DocumentType> {
    if (!this.client) {
      throw new MissingDatabaseClientError('MongoDB');
    }
    return this.client.db(this.database).collection<DocumentType>(collection);
  }

  /**
   * Wrapper for running an operation on the MongoDB client.
   * @param operation - The operation to run.
   * @returns the result of the operation.
   */
  private async runOperation(operation: () => Promise<any>): Promise<any> {
    try {
      const results = await operation();
      return results;
    } catch (error) {
      console.error('Error running operation:', error);
      throw error;
    }
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

  public async storeSchemaProduct(uri: string, product: ISchemaProduct) {
    // https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/insert/
    const collection = this.getCollection<IDBSchemaProduct>(
      Collections.SCHEMA_PRODUCT,
    );
    const doc: IDBSchemaProduct = {
      _id: uri,
      ...product,
    };
    await this.runOperation(async () => {
      return await collection.updateOne(
        doc,
        {
          $set: doc,
        },
        { upsert: true },
      );
    });
  }
}
