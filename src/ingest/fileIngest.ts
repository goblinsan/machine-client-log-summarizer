export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
}

export function fileIngest(fileContent: string): LogRecord[] {
  // Handle empty or whitespace-only files
  if (!fileContent || !fileContent.trim()) {
    return [];
  }

  // Regular expression to match log entries
  const logEntryRegex = /\[(.*?)\]\s+(\w+):\s+(.*)/g;

  const allRecords: LogRecord[] = [];

  let match;
  while ((match = logEntryRegex.exec(fileContent)) !== null) {
    const [, timestamp, level, message] = match;

    allRecords.push({
      timestamp,
      level,
      message
    });
  }

  return allRecords;
}

// Example usage:
// const records = fileIngest(fileContent);
// console.log(records);