export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export class MissingDatabaseConfigurationError extends ConfigurationError {
  constructor(config: string) {
    super(`Database configuration is missing: ${config}`);
    this.name = 'MissingDatabaseConfigurationError';
  }
}
