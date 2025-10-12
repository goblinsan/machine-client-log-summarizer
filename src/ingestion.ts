import { readAndNormalizeRecords } from './ingest/fileIngest';

/**
 * Processes log files and returns normalized records.
 * @param filePaths - Array of paths to JSON files containing log records
 * @returns Promise resolving to array of normalized log records from all files
 */
export async function processLogFiles(filePaths: string[]): Promise<NormalizedRecord[]> {
  const allRecords: NormalizedRecord[] = [];

  for (const filePath of filePaths) {
    const records = await readAndNormalizeRecords(filePath);
    allRecords.push(...records);
  }

  return allRecords;
}

/**
 * Processes a single log file and returns normalized records.
 * @param filePath - Path to the JSON file containing log records
 * @returns Promise resolving to array of normalized log records from the file
 */
export async function processLogFile(filePath: string): Promise<NormalizedRecord[]> {
  return readAndNormalizeRecords(filePath);
}

/**
 * Processes multiple log files and returns normalized records.
 * @param filePaths - Array of paths to JSON files containing log records
 * @returns Promise resolving to array of normalized log records from all files
 */
export async function processLogFilesFromMultipleSources(
  filePaths: string[]
): Promise<NormalizedRecord[]> {
  return readAndNormalizeRecordsFromMultipleFiles(filePaths);
}