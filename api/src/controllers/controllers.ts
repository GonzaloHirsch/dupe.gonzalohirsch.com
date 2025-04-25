import { Request, Response, NextFunction } from 'express';
import { exec as execCallback } from 'child_process';
import { isValidUrl } from '../utils/utils';
import { promisify } from 'util';
import asyncHandler from 'express-async-handler';

const exec = promisify(execCallback);
const regexTest =
  /.*\[(EMERGENCY|ALERT|CRITICAL|ERROR|WARNING|NOTICE|INFO|DEBUG)\].*/;

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

      const tokenisedStdout = stdout
        .split('\n')
        .filter((line) => line.length > 0);
      const logs = tokenisedStdout.filter((line) => regexTest.test(line));
      const output = tokenisedStdout.filter((line) => !regexTest.test(line));

      // Logging for visibility.
      console.log('Received URL:', url);
      console.debug(logs);
      console.debug('Potential Output:', output);

      let response: {
        location?: string;
      } = {};
      try {
        response['location'] = JSON.parse(output?.[0])?.result;
      } catch (error: any) {
        console.error(`Attempted to process ${output} but got ${error}.`);
        res.send(response);
      }

      res.send(response);
    } catch (error: any) {
      console.error(`Error executing PHP:`, error);
      throw new Error(error.message);
    }
  },
);
