import { describe, it, expect, vi } from 'vitest'

import fs from 'fs'
import { fileIngest } from './fileIngest'

  it('should handle invalid JSON gracefully', async () => {
    const result = await fileIngest('./nonexistent.json')
    expect(result).toEqual([])
  })