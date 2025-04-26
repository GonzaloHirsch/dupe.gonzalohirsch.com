import { InvalidURLError } from '../errors/validationErrors';
import { isValidUrl } from './utils';

export const gateOnURL = (url: string): void => {
  if (!isValidUrl(url)) {
    throw new InvalidURLError(url);
  }
};
