import fs from 'fs'
import path from 'path'

export interface FileData {
  fileName: string
  content: string
  size: number
}

export interface ProcessedFileData {
  fileName: string
  content: string
  size: number
  timestamp: Date
}

/**
 * Process a single file by reading its content and metadata
 * @param filePath - Path to the file to process
 * @returns Promise resolving to processed file data
 */
export async function processFile(filePath: string): Promise<ProcessedFileData> {
  try {
    // Validate file path
    if (!filePath || typeof filePath !== 'string') {
      throw new Error('Invalid file path provided')
    }

    // Get file stats to determine size
    const stats = await fs.promises.stat(filePath)

    // Read file content
    const content = await fs.promises.readFile(filePath, 'utf8')

    return {
      fileName: path.basename(filePath),
      content,
      size: stats.size,
      timestamp: new Date()
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to process file ${filePath}: ${error.message}`)
    }
    throw new Error(`Failed to process file ${filePath}: Unknown error`)
  }
}

/**
 * Process multiple files in parallel
 * @param filePaths - Array of file paths to process
 * @returns Promise resolving to array of processed file data
 */
export async function processFiles(filePaths: string[]): Promise<ProcessedFileData[]> {
  try {
    // Validate input
    if (!Array.isArray(filePaths)) {
      throw new Error('File paths must be provided as an array')
    }

    // Process files in parallel
    const results = await Promise.all(
      filePaths.map(filePath => processFile(filePath))
    )

    return results
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to process files: ${error.message}`)
    }
    throw new Error('Failed to process files: Unknown error')
  }
}

/**
 * Get file size in bytes
 * @param filePath - Path to the file
 * @returns Promise resolving to file size in bytes
 */
export async function getFileSize(filePath: string): Promise<number> {
  try {
    const stats = await fs.promises.stat(filePath)
    return stats.size
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get file size for ${filePath}: ${error.message}`)
    }
    throw new Error(`Failed to get file size for ${filePath}: Unknown error`)
  }
}