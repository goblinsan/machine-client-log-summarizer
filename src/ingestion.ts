import { processFile } from './fileIngest';

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  source?: string;
}

export interface Summary {
  totalEntries: number;
  entryCounts: Record<string, number>;
  levels: string[];
  earliestTimestamp: string | null;
  latestTimestamp: string | null;
  sources: string[];
}

/**
 * Process a collection of log entries and generate a summary
 */
export function processLogs(logs: LogEntry[]): Summary {
  if (!logs || logs.length === 0) {
    return {
      totalEntries: 0,
      entryCounts: {},
      levels: [],
      earliestTimestamp: null,
      latestTimestamp: null,
      sources: []
    };
  }

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
      latestTimestamp = log.timestamp;
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