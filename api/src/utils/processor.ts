import { promises as fs } from 'fs';
import { ISchemaProductWrapper } from '../models/schemaProduct';

const regexTest =
  /.*\[(EMERGENCY|ALERT|CRITICAL|ERROR|WARNING|NOTICE|INFO|DEBUG)\].*/;

export const processPHPOutput = (
  stdout: string,
): { logs: string[]; output: string[] } => {
  const tokenisedStdout = stdout.split('\n').filter((line) => line.length > 0);
  const logs = tokenisedStdout.filter((line) => regexTest.test(line));
  const output = tokenisedStdout.filter((line) => !regexTest.test(line));
  return { logs, output };
};

export const parsePHPOutput = (
  output: string[],
): {
  location: string | null | undefined;
} => {
  let location;
  try {
    location = JSON.parse(output?.[0])?.result;
  } catch (error: any) {
    console.error(`Attempted to process ${output} but got ${error}.`);
  }
  return { location };
};

export const loadPHPOutputFromFile = async (
  absoluteFilepath: string,
): Promise<ISchemaProductWrapper[]> => {
  let fileContent;
  try {
    fileContent = await fs.readFile(absoluteFilepath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error: any) {
    console.error(
      `Could not process output from ${absoluteFilepath}: ${fileContent}`,
    );
  }
  return [];
};
