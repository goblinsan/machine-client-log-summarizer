import { describe, it, expect } from 'vitest'

describe('Smoke Tests', () => {
  it('should run successfully', () => {
    expect(true).toBe(true)
  })

  it('should import config without errors', () => {
    const config = await import('../config/index.ts')
    expect(config).toBeDefined()
  })

  it('should import utils without errors', () => {
    const utils = await import('../utils/index.ts')
    expect(utils).toBeDefined()
  })
})