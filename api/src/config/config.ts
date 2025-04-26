import dotenv from 'dotenv';
import { MissingDatabaseConfigurationError } from '../errors/configurationErrors';

dotenv.config();

type DatabaseType = 'MongoDB';

interface Config {
  port: number;
  nodeEnv: string;
  db: {
    uri: string | undefined;
    type: DatabaseType;
  };
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    uri: process.env.DB_URI,
    type: process.env.DB_TYPE as DatabaseType,
  },
};

if (!config.db.uri) {
  throw new MissingDatabaseConfigurationError('uri');
}

export default config;
