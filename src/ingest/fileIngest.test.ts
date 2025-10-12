import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readAndNormalizeJsonFile } from './fileIngest'

// Mock file system operations
vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn(),
    access: vi.fn()
  }
}))

describe('readAndNormalizeJsonFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should read and normalize valid JSON file', async () => {
    const mockData = {
      timestamp: '2023-01-01T00:00:00Z',
      level: 'INFO',
      message: 'Test log entry',
      metadata: {
        service: 'test-service'
      }
    }

    vi.mocked(require('fs').promises.readFile).mockResolvedValue(
      JSON.stringify(mockData)
    )

    const result = await readAndNormalizeJsonFile('test.json')

    expect(result).toEqual({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'INFO',
      message: 'Test log entry',
      service: 'test-service'
    })
  })

  it('should throw error for invalid JSON', async () => {
    vi.mocked(require('fs').promises.readFile).mockResolvedValue(
      '{ invalid json }'
    )

    await expect(readAndNormalizeJsonFile('test.json')).rejects.toThrow(
      'Failed to parse JSON'
    )
  })

  it('should throw error for missing file', async () => {
    vi.mocked(require('fs').promises.access).mockRejectedValue(
      new Error('File not found')
    )

    await expect(readAndNormalizeJsonFile('nonexistent.json')).rejects.toThrow(
      'File not found'
    )
  })

  it('should handle missing metadata gracefully', async () => {
    const mockData = {
      timestamp: '2023-01-01T00:00:00Z',
      level: 'INFO',
      message: 'Test log entry'
    }

    vi.mocked(require('fs').promises.readFile).mockResolvedValue(
      JSON.stringify(mockData)
    )

    const result = await readAndNormalizeJsonFile('test.json')

    expect(result).toEqual({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'INFO',
      message: 'Test log entry',
      service: undefined
    })
  })

  it('should normalize log level to uppercase', async () => {
    const mockData = {
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      message: 'Test log entry'
    }

    vi.mocked(require('fs').promises.readFile).mockResolvedValue(
      JSON.stringify(mockData)
    )

    const result = await readAndNormalizeJsonFile('test.json')

    expect(result.level).toBe('INFO')
  })
})