import { describe, it, expect } from 'vitest'
import { processLogFiles } from './fileIngest'

describe('processLogFiles', () => {
  it('should handle empty input array', () => {
    const result = processLogFiles([])
    expect(result).toEqual([])
  })

  it('should parse valid JSON log entries', () => {
    const mockFileContent = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Test message"}\n{"timestamp": "2023-01-01T01:00:00Z", "level": "ERROR", "message": "Error message"}`
    const mockFile = new File([mockFileContent], 'test.json')

    const result = processLogFiles([mockFile])

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({
      timestamp: "2023-01-01T00:00:00Z",
      level: "INFO",
      message: "Test message"
    })
    expect(result[1]).toEqual({
      timestamp: "2023-01-01T01:00:00Z",
      level: "ERROR",
      message: "Error message"
    })
  })

  it('should skip invalid JSON entries', () => {
    const mockFileContent = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Test message"}\ninvalid json\n{"timestamp": "2023-01-01T01:00:00Z", "level": "ERROR", "message": "Error message"}`
    const mockFile = new File([mockFileContent], 'test.json')

    const result = processLogFiles([mockFile])

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({
      timestamp: "2023-01-01T00:00:00Z",
      level: "INFO",
      message: "Test message"
    })
    expect(result[1]).toEqual({
      timestamp: "2023-01-01T01:00:00Z",
      level: "ERROR",
      message: "Error message"
    })
  })

  it('should handle file with no valid entries', () => {
    const mockFileContent = `invalid json\n{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO"}\ninvalid json`
    const mockFile = new File([mockFileContent], 'test.json')

    const result = processLogFiles([mockFile])

    expect(result).toHaveLength(0)
  })
})