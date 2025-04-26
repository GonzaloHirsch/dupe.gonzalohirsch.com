const quoteRegex = /['"`]/g;

export function isValidUrl(url: string): boolean {
  try {
    // Do not allow URLs with quotes.
    if (quoteRegex.test(url)) {
      return false;
    }

    // Attempt to parse the URL.
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (_) {
    return false;
  }
}
