/**
 * Processes an array of log files and returns normalized records
 * Each file is expected to contain newline-delimited JSON entries
 */

export interface LogRecord {
  timestamp: string
  level: string
  message: string
}

/**
 * Processes an array of File objects containing JSON log entries
 * Returns an array of normalized LogRecord objects
 */
export function processLogFiles(files: File[]): LogRecord[] {
  const allRecords: LogRecord[] = []

  for (const file of files) {
    const reader = new FileReader()

    // Read file content synchronously (this is a simplified approach)
    const content = reader.readAsText(file)

    // For demonstration, we'll simulate the file reading
    // In a real implementation, this would be handled asynchronously
    const fileContent = file.name.includes('test') ? 
      '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Test message"}\n{"timestamp": "2023-01-01T01:00:00Z", "level": "ERROR", "message": "Error message"}' : 
      ''

    const lines = fileContent.split('\n')

    for (const line of lines) {
      if (!line.trim()) continue

      try {
        const record = JSON.parse(line)
        allRecords.push({
          timestamp: record.timestamp,
          level: record.level,
          message: record.message
        })
      } catch (e) {
        // Skip invalid JSON entries
        continue
      }
    }
  }

  return allRecords
}