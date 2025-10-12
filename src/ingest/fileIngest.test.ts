import { describe, it, expect, vi } from 'vitest'
import { processFileContent } from './fileIngest'

describe('processFileContent', () => {
  it('should parse valid JSON array and return normalized records', () => {
    const content = `[
      {
        "timestamp": "2023-01-01T00:00:00Z",
        "level": "INFO",
        "message": "Application started",
        "service": "frontend"
      },
      {
        "timestamp": "2023-01-01T01:00:00Z",
        "level": "ERROR",
        "message": "Database connection failed",
        "service": "backend"
      }
    ]`

    const result = processFileContent(content)

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'INFO',
      message: 'Application started',
      service: 'frontend'
    })
    expect(result[1]).toEqual({
      timestamp: '2023-01-01T01:00:00Z',
      level: 'ERROR',
      message: 'Database connection failed',
      service: 'backend'
    })
  })

  it('should handle single JSON object', () => {
    const content = `{
      "timestamp": "2023-01-01T00:00:00Z",
      "level": "INFO",
      "message": "Application started",
      "service": "frontend"
    }`

    const result = processFileContent(content)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'INFO',
      message: 'Application started',
      service: 'frontend'
    })
  })

  it('should handle malformed JSON gracefully', () => {
    const content = `{
      "timestamp": "2023-01-01T00:00:00Z",
      "level": "INFO",
      "message": "Application started",
      "service": "frontend"
    }`

    const result = processFileContent(content)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'INFO',
      message: 'Application started',
      service: 'frontend'
    })
  })

  it('should handle empty content', () => {
    const result = processFileContent('')

    expect(result).toHaveLength(0)
  })

  it('should handle invalid JSON content', () => {
    const result = processFileContent('{ invalid json }')

    expect(result).toHaveLength(0)
  })

  it('should handle array with mixed valid/invalid entries', () => {
    const content = `[
      {
        "timestamp": "2023-01-01T00:00:00Z",
        "level": "INFO",
        "message": "Application started"
      },
      "{ invalid json }",
      {
        "timestamp": "2023-01-01T01:00:00Z",
        "level": "ERROR",
        "message": "Database connection failed"
      }
    ]`

    const result = processFileContent(content)

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'INFO',
      message: 'Application started'
    })
    expect(result[1]).toEqual({
      timestamp: '2023-01-01T01:00:00Z',
      level: 'ERROR',
      message: 'Database connection failed'
    })
  })

  it('should normalize field names to lowercase', () => {
    const content = `[
      {
        "TIMESTAMP": "2023-01-01T00:00:00Z",
        "LEVEL": "INFO",
        "MESSAGE": "Application started",
        "SERVICE": "frontend"
      }
    ]`

    const result = processFileContent(content)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'INFO',
      message: 'Application started',
      service: 'frontend'
    })
  })

  it('should handle missing fields gracefully', () => {
    const content = `[
      {
        "timestamp": "2023-01-01T00:00:00Z",
        "level": "INFO"
      }
    ]`

    const result = processFileContent(content)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'INFO'
    })
  })
})