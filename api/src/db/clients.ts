import config, { DatabaseType } from '../config/config';
import { MissingDatabaseTypeError } from '../errors/configurationErrors';
import { DupeMongoDBClient } from './mongoClient';

export interface DupeDatabaseClient {
  //   getInstance: () => DupeDatabaseClient;
}

const CLIENTS: {
  [key in DatabaseType]: {
    getInstance: (uri: string, database: string) => DupeDatabaseClient;
  };
} = {
  [DatabaseType.MONGODB]: {
    getInstance: DupeMongoDBClient.getInstance,
  },
};

/**
 * Getter for the current database client.
 * @returns {DupeDatabaseClient} - The currently configured database client.
 */
export const getCurrentClient = (): DupeDatabaseClient => {
  // Make sure we know how to handle the current client.
  if (!CLIENTS[config.db.type]) {
    throw new MissingDatabaseTypeError(config.db.type);
  }
  return CLIENTS[config.db.type].getInstance(
    config.db.uri as string,
    config.db.database as string,
  );
};
