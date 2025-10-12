import fs from 'fs'
import path from 'path'
import { processFiles, ProcessedFileData } from './fileIngest'

export interface LogProcessingResult {
  totalFiles: number
  totalSize: number
  processedFiles: ProcessedFileData[]
  summary: string
}

/**
 * Process log files from a directory
 * @param directoryPath - Path to the directory containing log files
 * @returns Promise resolving to processing results summary
 */
export async function processLogFiles(directoryPath: string): Promise<LogProcessingResult> {
  try {
    // Validate directory path
    if (!directoryPath || typeof directoryPath !== 'string') {
      throw new Error('Invalid directory path provided')
    }

    // Read directory contents
    const files = await fs.promises.readdir(directoryPath)

    // Filter for log files (ending with .log)
    const logFiles = files.filter(file => file.endsWith('.log'))

    // Process all log files
    const processedFiles = await processFiles(
      logFiles.map(file => path.join(directoryPath, file))
    )

    // Calculate total size
    const totalSize = processedFiles.reduce((sum, file) => sum + file.size, 0)

    // Generate summary
    const summary = generateSummary(processedFiles, totalSize)

    return {
      totalFiles: logFiles.length,
      totalSize,
      processedFiles,
      summary
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to process log files from ${directoryPath}: ${error.message}`)
    }
    throw new Error(`Failed to process log files from ${directoryPath}: Unknown error`)
  }
}

/**
 * Generate a summary string from processed files
 * @param files - Array of processed files
 * @param totalSize - Total size in bytes
 * @returns Summary string
 */
function generateSummary(files: ProcessedFileData[], totalSize: number): string {
  return `Processed ${files.length} log files with total size of ${totalSize} bytes`
}