import { promises as fs } from 'fs'

// Define types for our log records
export interface RawLogRecord {
  timestamp: string
  level: string
  message: string
  metadata?: {
    service?: string
    [key: string]: unknown
  }
}

export interface NormalizedLogRecord {
  timestamp: string
  level: string
  message: string
  service?: string
}

/**
 * Reads a JSON file and normalizes its content into a standardized format
 * @param filePath - Path to the JSON file to read
 * @returns Promise resolving to normalized log record
 */
export async function readAndNormalizeJsonFile(
  filePath: string
): Promise<NormalizedLogRecord> {
  try {
    // Check if file exists
    await fs.access(filePath)

    // Read and parse the file content
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const rawLogRecord: RawLogRecord = JSON.parse(fileContent)

    // Normalize the record
    const normalizedRecord: NormalizedLogRecord = {
      timestamp: rawLogRecord.timestamp,
      level: rawLogRecord.level.toUpperCase(),
      message: rawLogRecord.message,
      service: rawLogRecord.metadata?.service
    }

    return normalizedRecord
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read or parse file ${filePath}: ${error.message}`)
    } else {
      throw new Error(`Failed to read or parse file ${filePath}: Unknown error`)
    }
  }
}