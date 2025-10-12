import fs from 'fs';

export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
}

export function processJsonFile(filePath: string): LogRecord[] {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(fileContent);

    if (!Array.isArray(parsedData)) {
      throw new Error('Expected an array of log records');
    }

    return parsedData.map((record: any) => ({
      timestamp: record.timestamp,
      level: record.level?.toUpperCase() || '',
      message: record.message || '',
    }));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse JSON');
    }
    throw error;
  }
}