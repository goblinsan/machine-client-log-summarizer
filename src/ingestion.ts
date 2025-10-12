import { processLogFile } from './fileIngest';

export interface ProcessedLogFile {
  fileName: string;
  fileSize: number;
  parsedContent: {
    timestamp: string;
    level: string;
    message: string;
  }[];
}

export async function processLogFiles(filePaths: string[]): Promise<ProcessedLogFile[]> {
  try {
    // Process files in parallel for better performance
    const results = await Promise.all(
      filePaths.map(filePath => processLogFile(filePath))
    );

    return results;
  } catch (error) {
    throw new Error(`Failed to process log files: ${(error as Error).message}`);
  }
}