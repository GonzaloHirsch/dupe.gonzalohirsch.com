import { Request, Response, NextFunction } from 'express';
import { exec as execCallback } from 'child_process';
import { isValidUrl } from '../utils/utils';
import { promisify } from 'util';
import asyncHandler from 'express-async-handler';

const exec = promisify(execCallback);

export const runCommand = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { url } = req.body;

    if (!isValidUrl(url)) {
      throw new Error(`Invalid URL ${url}.`);
    }

    try {
      const { stdout, stderr } = await exec(`php ../php/Main.php -u "${url}"`);

      if (stderr) {
        // Optional: you can decide how to handle non-critical stderr output
        console.error(`PHP stderr: ${stderr}`);
      }

      res.send(stdout); // Waits until PHP finishes, then sends response
    } catch (error: any) {
      console.error(`Error executing PHP:`, error);
      throw new Error(error.message);
    }
  },
);
