import { describe, it, expect } from 'vitest'
import { loadConfig } from '../config/loader'

describe('Smoke Tests', () => {
  it('should load config successfully', async () => {
    const config = await loadConfig()
    expect(config).toBeDefined()
    expect(config.name).toBe('Log Summarizer')
  })

  it('should have default settings', async () => {
    const config = await loadConfig()
    expect(config).toHaveProperty('name')
    expect(config).toHaveProperty('version')
  })

  it('should export synthetic logs', async () => {
    const { syntheticLogs } = await import('../config/synthetic-logs')
    expect(syntheticLogs).toBeDefined()
    expect(Array.isArray(syntheticLogs)).toBe(true)
  })
})