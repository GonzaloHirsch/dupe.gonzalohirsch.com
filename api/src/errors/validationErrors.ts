export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class InvalidURLError extends ValidationError {
  constructor(url: string) {
    super(`Invalid URL: ${url}`);
    this.name = 'InvalidURLError';
  }
}
