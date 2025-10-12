export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
  service?: string;
  [key: string]: any;
}

/**
 * Process a file containing JSON log records and return normalized records
 * @param fileContent - The content of the file to process
 * @returns Promise<LogRecord[]> - Array of normalized log records
 */
export async function processFile(fileContent: string): Promise<LogRecord[]> {
  if (!fileContent || fileContent.trim() === '') {
    return [];
  }

  const records: LogRecord[] = [];

  // Handle JSON array format
  if (fileContent.trim().startsWith('[')) {
    try {
      const parsedArray = JSON.parse(fileContent.trim());
      if (Array.isArray(parsedArray)) {
        for (const item of parsedArray) {
          if (typeof item === 'object' && item !== null) {
            records.push(item as LogRecord);
          }
        }
      }
    } catch (error) {
      // If parsing fails, fall back to line-by-line processing
      console.warn('Failed to parse JSON array, falling back to line-by-line processing');
    }
  }

  // If we didn't get any records from array parsing, process line by line
  if (records.length === 0) {
    const lines = fileContent.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (trimmedLine === '') {
        continue;
      }

      try {
        // Try to parse as JSON
        const parsed = JSON.parse(trimmedLine);

        // Ensure it's an object and not null
        if (typeof parsed === 'object' && parsed !== null) {
          records.push(parsed as LogRecord);
        }
      } catch (error) {
        // Skip malformed JSON lines
        console.warn(`Skipping malformed JSON line: ${trimmedLine}`);
        continue;
      }
    }
  }

  return records;
}