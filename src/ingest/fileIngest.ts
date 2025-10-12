import { promises as fs } from 'fs';

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}

export async function readAndNormalizeFile(filePath: string): Promise<LogEntry[]> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Parse the JSON content
    const parsedData = JSON.parse(fileContent);

    // Handle single log entry (not in array)
    const logEntries = Array.isArray(parsedData) ? parsedData : [parsedData];

    // Normalize entries to ensure required fields exist
    const normalizedEntries = logEntries.map(entry => ({
      timestamp: entry.timestamp || '',
      level: entry.level || '',
      message: entry.message || '',
    }));

    return normalizedEntries;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse JSON');
    } else if (error instanceof Error) {
      throw new Error(`Failed to read file: ${error.message}`);
    } else {
      throw new Error('Failed to read file');
    }
  }
}