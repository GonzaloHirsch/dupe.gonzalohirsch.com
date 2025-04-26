import dotenv from 'dotenv';
import { MissingDatabaseConfigurationError } from '../errors/configurationErrors';

dotenv.config();

export enum DatabaseType {
  MONGODB = 'MongoDB',
}

interface Config {
  port: number;
  nodeEnv: string;
  db: {
    uri: string | undefined;
    database: string | undefined;
    type: DatabaseType;
  };
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    uri: process.env.DB_URI,
    type: process.env.DB_TYPE as DatabaseType,
    database: process.env.DB_NAME,
  },
};

if (!config.db.uri) {
  throw new MissingDatabaseConfigurationError('uri');
}
if (!config.db.database) {
  throw new MissingDatabaseConfigurationError('database name');
}

export default config;
