import fs from 'fs';
import path from 'path';

import { processFileWithSummary } from './fileIngest';

/**
 * Process a file and return its log summary
 */
export async function processFile(filePath: string): Promise<any> {
  return await processFileWithSummary(filePath);
}

/**
 * Process multiple files and return their summaries
 */
export async function processFiles(filePaths: string[]): Promise<any[]> {
  const summaries: any[] = [];

  for (const filePath of filePaths) {
    try {
      const summary = await processFileWithSummary(filePath);
      summaries.push(summary);
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
      // Optionally continue with other files or throw the error
    }
  }

  return summaries;
}