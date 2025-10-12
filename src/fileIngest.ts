import fs from 'fs';
import path from 'path';

/**
 * Process a file and return its log entries
 */
export async function processFile(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          // Parse the JSON data
          const logs = JSON.parse(data);
          resolve(logs);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
}

/**
 * Process logs and generate a summary
 */
export function processLogs(logs: any[]): Summary {
  const entryCounts: Record<string, number> = {};
  const levels: string[] = [];
  const sources: string[] = [];
  let earliestTimestamp: string | null = null;
  let latestTimestamp: string | null = null;

  logs.forEach(log => {
    // Count entries by level
    entryCounts[log.level] = (entryCounts[log.level] || 0) + 1;

    // Track levels
    if (!levels.includes(log.level)) {
      levels.push(log.level);
    }

    // Track sources
    if (log.source && !sources.includes(log.source)) {
      sources.push(log.source);
    }

    // Track timestamps
    if (!earliestTimestamp || log.timestamp < earliestTimestamp) {
      earliestTimestamp = log.timestamp;
    }

    if (!latestTimestamp || log.timestamp > latestTimestamp) {
      latestTimestammp = log.timestamp;
    }
  });

  return {
    totalEntries: logs.length,
    entryCounts,
    levels,
    earliestTimestamp,
    latestTimestamp,
    sources
  };
}

/**
 * Process a file and return its log summary
 */
export async function processFileWithSummary(filePath: string): Promise<Summary> {
  try {
    const logs = await processFile(filePath);
    return processLogs(logs);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    throw error;
  }
}

/**
 * Type definition for log summary
 */
export type Summary = {
  totalEntries: number;
  entryCounts: Record<string, number>;
  levels: string[];
  earliestTimestamp: string | null;
  latestTimestamp: string | null;
  sources: string[];
}