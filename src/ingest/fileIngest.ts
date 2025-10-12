import fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

export interface LogRecord {
  timestamp: string
  level: string
  message: string
  service?: string
}

export async function fileIngest(filePath: string): Promise<LogRecord[]> {
  try {
    const fileContent = await readFile(filePath, 'utf8')
    const parsed = JSON.parse(fileContent)

    // Handle single log entry
    if (parsed.timestamp && parsed.level && parsed.message) {
      return [parsed as LogRecord]
    }

    // Handle array of log entries
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (entry): entry is LogRecord => 
          entry.timestamp && entry.level && entry.message
      )
    }

    return []
  } catch (error) {
    console.error(`Error reading or parsing file ${filePath}:`, error)
    return []
  }
}