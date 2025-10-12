import { describe, it, expect, vi } from 'vitest'
import { processLogFiles } from './ingestion'

// Mock file system operations
vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn().mockResolvedValue('test log content'),
    stat: vi.fn().mockResolvedValue({ size: 1024 }),
    readdir: vi.fn().mockResolvedValue(['file1.log', 'file2.log'])
  }
}))

describe('processLogFiles', () => {
  it('should process log files and return summary', async () => {
    const result = await processLogFiles('./logs')
    expect(result).toEqual({
      totalFiles: 2,
      totalSize: 2048,
      processedFiles: [
        {
          fileName: 'file1.log',
          content: 'test log content',
          size: 1024,
          timestamp: expect.any(Date)
        },
        {
          fileName: 'file2.log',
          content: 'test log content',
          size: 1024,
          timestamp: expect.any(Date)
        }
      ],
      summary: expect.any(String)
    })
  })

  it('should handle empty directory', async () => {
    const mockReaddir = vi.fn().mockResolvedValue([])
    vi.mock('fs', () => ({
      promises: {
        readFile: vi.fn().mockResolvedValue('test content'),
        stat: vi.fn().mockResolvedValue({ size: 1024 }),
        readdir: mockReaddir
      }
    }))

    const result = await processLogFiles('./empty')
    expect(result).toEqual({
      totalFiles: 0,
      totalSize: 0,
      processedFiles: [],
      summary: expect.any(String)
    })
  })

  it('should filter out non-log files', async () => {
    const mockReaddir = vi.fn().mockResolvedValue(['file1.txt', 'file2.log', 'file3.json'])
    vi.mock('fs', () => ({
      promises: {
        readFile: vi.fn().mockResolvedValue('test content'),
        stat: vi.fn().mockResolvedValue({ size: 1024 }),
        readdir: mockReaddir
      }
    }))

    const result = await processLogFiles('./mixed')
    expect(result).toEqual({
      totalFiles: 1,
      totalSize: 1024,
      processedFiles: [
        {
          fileName: 'file2.log',
          content: 'test content',
          size: 1024,
          timestamp: expect.any(Date)
        }
      ],
      summary: expect.any(String)
    })
  })

  it('should handle directory read errors', async () => {
    const mockReaddir = vi.fn().mockRejectedValue(new Error('Directory not found'))
    vi.mock('fs', () => ({
      promises: {
        readFile: vi.fn().mockResolvedValue('test content'),
        stat: vi.fn().mockResolvedValue({ size: 1024 }),
        readdir: mockReaddir
      }
    }))

    await expect(processLogFiles('./nonexistent')).rejects.toThrow('Directory not found')
  })

  it('should handle file processing errors gracefully', async () => {
    const mockReadFile = vi.fn().mockRejectedValue(new Error('File read error'))
    vi.mock('fs', () => ({
      promises: {
        readFile: mockReadFile,
        stat: vi.fn().mockResolvedValue({ size: 1024 }),
        readdir: vi.fn().mockResolvedValue(['error.log'])
      }
    }))

    await expect(processLogFiles('./logs')).rejects.toThrow('File read error')
  })
})