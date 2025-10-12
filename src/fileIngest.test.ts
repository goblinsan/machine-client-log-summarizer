import { describe, it, expect, vi } from 'vitest'
import { processFile } from './fileIngest'

// Mock file system operations
vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn().mockResolvedValue('test log content'),
    stat: vi.fn().mockResolvedValue({ size: 1024 })
  }
}))

describe('processFile', () => {
  it('should process a file and return parsed content', async () => {
    const result = await processFile('test.log')
    expect(result).toEqual({
      fileName: 'test.log',
      content: 'test log content',
      size: 1024
    })
  })

  it('should handle file read errors gracefully', async () => {
    const mockReadFile = vi.fn().mockRejectedValue(new Error('File not found'))
    vi.mock('fs', () => ({
      promises: {
        readFile: mockReadFile,
        stat: vi.fn().mockResolvedValue({ size: 1024 })
      }
    }))

    await expect(processFile('nonexistent.log')).rejects.toThrow('File not found')
  })

  it('should handle file size calculation errors', async () => {
    const mockStat = vi.fn().mockRejectedValue(new Error('Stat failed'))
    vi.mock('fs', () => ({
      promises: {
        readFile: vi.fn().mockResolvedValue('test content'),
        stat: mockStat
      }
    }))

    await expect(processFile('test.log')).rejects.toThrow('Stat failed')
  })

  it('should handle empty file content', async () => {
    const mockReadFile = vi.fn().mockResolvedValue('')
    vi.mock('fs', () => ({
      promises: {
        readFile: mockReadFile,
        stat: vi.fn().mockResolvedValue({ size: 0 })
      }
    }))

    const result = await processFile('empty.log')
    expect(result).toEqual({
      fileName: 'empty.log',
      content: '',
      size: 0
    })
  })

  it('should handle large file content', async () => {
    const largeContent = 'A'.repeat(1000000)
    const mockReadFile = vi.fn().mockResolvedValue(largeContent)
    vi.mock('fs', () => ({
      promises: {
        readFile: mockReadFile,
        stat: vi.fn().mockResolvedValue({ size: 1000000 })
      }
    }))

    const result = await processFile('large.log')
    expect(result).toEqual({
      fileName: 'large.log',
      content: largeContent,
      size: 1000000
    })
  })
})