/**
 * Parses a JSON log file content and returns normalized records
 * Each line should contain a valid JSON object with timestamp, level, and message fields
 * @param fileContent - The content of the JSON log file as a string
 * @returns Array of normalized log records
 */
export function fileIngest(fileContent: string): Array<{ timestamp: string; level: string; message: string }> {
  if (!fileContent || fileContent.trim() === '') {
    return [];
  }

  const lines = fileContent.split('\n');
  const records: Array<{ timestamp: string; level: string; message: string }> = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Skip empty lines
    if (trimmedLine === '') {
      continue;
    }

    try {
      // Parse the JSON line
      const parsedLine = JSON.parse(trimmedLine);

      // Validate required fields
      if (!parsedLine.timestamp || !parsedLine.level || !parsedLine.message) {
        throw new Error('Missing required fields in log line');
      }

      // Normalize the record by only including timestamp, level, and message
      records.push({
        timestamp: parsedLine.timestamp,
        level: parsedLine.level,
        message: parsedLine.message
      });

    } catch (error) {
      // Re-throw error with more context
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON in log line');
      } else {
        throw error;
      }
    }
  }

  return records;
}