import { exec as execCallback } from 'child_process';
import { promisify } from 'util';
import {
  loadPHPOutputFromFile,
  parsePHPOutput,
  processPHPOutput,
} from '../utils/processor';
import { ISchemaProduct } from '../models/schemaProduct';

// So that we can await the exec function.
const exec = promisify(execCallback);

/**
 * Detects a product schema from a given URL.
 * @param {string} url - The URL to be processed.
 * @returns {Promise<ISchemaProduct | null>} - The detected product or null if not found.
 */
export const detectSchemaProduct = async (
  url: string,
): Promise<ISchemaProduct | null> => {
  try {
    const { stdout, stderr } = await exec(`php ../php/Main.php -u "${url}"`);

    if (stderr) {
      // Optional: you can decide how to handle non-critical stderr output
      console.error(`PHP stderr: ${stderr}`);
    }

    // Process the output.
    const { logs, output } = processPHPOutput(stdout);

    // Logging for visibility.
    console.log('Received URL:', url);
    console.debug(logs);
    console.debug('Potential Output:', output);

    // Actually parse the output.
    const response = parsePHPOutput(output);
    if (response.location === null || response.location === undefined) {
      return null;
    }

    // Process the file content.
    const content = await loadPHPOutputFromFile(response.location as string);

    // Get the first item if any.
    return content?.[0].unnamed ?? null;
  } catch (error: any) {
    console.error(`Error executing PHP:`, error);
    return null;
  }
};
