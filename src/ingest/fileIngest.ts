import fs from 'fs';

export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
  service: string;
  sourceFile: string;
}

export function processJsonFiles(filePaths: string[]): LogRecord[] {
  const allRecords: LogRecord[] = [];

  for (const filePath of filePaths) {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`File does not exist: ${filePath}`);
      continue;
    }

    try {
      // Read file content
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      // Parse JSON content
      const parsedContent = JSON.parse(fileContent);

      // Normalize the record structure
      const normalizedRecord: LogRecord = {
        timestamp: parsedContent.timestamp || '',
        level: parsedContent.level || '',
        message: parsedContent.message || '',
        service: parsedContent.service || '',
        sourceFile: filePath,
      };

      allRecords.push(normalizedRecord);
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  }

  return allRecords;
}