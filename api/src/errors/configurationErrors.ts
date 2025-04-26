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

export class MissingDatabaseTypeError extends ConfigurationError {
  constructor(type: string) {
    super(`Database type is missing from internal configuration: ${type}`);
    this.name = 'MissingDatabaseTypeError';
  }
}
