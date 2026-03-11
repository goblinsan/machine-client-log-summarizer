import { vi } from 'vitest'

// Mock console to prevent noise in tests
vi.spyOn(console, 'log').mockImplementation(() => {})
vi.spyOn(console, 'error').mockImplementation(() => {})
vi.spyOn(console, 'warn').mockImplementation(() => {})

// Mock any external modules that might cause issues
vi.mock('fs')
vi.mock('path')

// Set up test environment
globalThis.__TEST__ = true
