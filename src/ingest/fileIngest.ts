import { readFile } from 'fs/promises';
import { parseISO, isValid } from 'date-fns';

// Define the normalized record structure
export interface NormalizedRecord {
  timestamp: string;
  level: string;
  message: string;
  source: string;
}

// Helper function to normalize timestamp format
function normalizeTimestamp(timestampStr: string): string {
  // Try to parse the timestamp as ISO format first
  const parsed = parseISO(timestampStr);
  if (isValid(parsed)) {
    return parsed.toISOString();
  }

  // If that fails, try to parse as a custom format (e.g., "2023-01-01 00:00:00")
  const customFormatRegex = /^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})$/;
  const match = timestampStr.match(customFormatRegex);

  if (match) {
    const datePart = match[1];
    const timePart = match[2];
    const isoString = `${datePart}T${timePart}Z`;
    return isoString;
  }

  // If all else fails, return the original string
  return timestampStr;
}

// Helper function to validate required fields
function isValidRecord(obj: any): obj is NormalizedRecord {
  return (
    typeof obj.timestamp === 'string' &&
    typeof obj.level === 'string' &&
    typeof obj.message === 'string'
  );
}

// Helper function to parse JSON content
async function parseJsonContent(content: string): Promise<any[]> {
  try {
    const parsed = JSON.parse(content);

    // If it's an array, return as-is
    if (Array.isArray(parsed)) {
      return parsed;
    }

    // If it's a single object, wrap in array
    return [parsed];
  } catch (error) {
    // Return empty array if parsing fails
    return [];
  }
}

// Main function to read and normalize JSON files
export async function readAndNormalizeJsonFiles(
  filePaths: string[]
): Promise<NormalizedRecord[]> {
  const allRecords: NormalizedRecord[] = [];

  for (const filePath of filePaths) {
    try {
      const content = await readFile(filePath, 'utf8');

      // Skip empty files
      if (!content.trim()) {
        continue;
      }

      const parsedObjects = await parseJsonContent(content);

      // Process each parsed object
      for (const obj of parsedObjects) {
        // Validate required fields
        if (!isValidRecord(obj)) {
          continue;
        }

        // Normalize timestamp
        const normalizedTimestamp = normalizeTimestamp(obj.timestamp);

        // Create normalized record with source
        const normalizedRecord: NormalizedRecord = {
          timestamp: normalizedTimestamp,
          level: obj.level,
          message: obj.message,
          source: filePath
        };

        allRecords.push(normalizedRecord);
      }
    } catch (error) {
      // Skip files that cannot be read or parsed
      continue;
    }
  }

  return allRecords;
}