// Smoke tests - Multi-Agent Log Summarizer
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const promptsDir = join(__dirname, '..', 'config', 'prompts');
describe('Smoke Tests - Prompt Files', () => {
  const requiredPrompts = [
    'context.md',
    'coordinator.md',
    'lead-engineer.md',
    'qa.md',
    'security.md',
  ];
  requiredPrompts.forEach((promptFile) => {
    it(`should exist: ${promptFile}`, () => {
      const filePath = join(promptsDir, promptFile);
      expect(readFileSync(filePath, 'utf-8')).toBeTruthy();
    });
  });
  it('should have valid markdown structure', () => {
    const files = requiredPrompts.map((f) => join(promptsDir, f));
    files.forEach((file) => {
      const content = readFileSync(file, 'utf-8');
      expect(content).toContain('#');
      expect(content).toContain('##');
    });
  });
  it('should contain safety limits', () => {
    const files = requiredPrompts.map((f) => join(promptsDir, f));
    files.forEach((file) => {
      const content = readFileSync(file, 'utf-8');
      expect(content).toContain('## Safety Limits');
    });
  });
  it('should contain escalation rules', () => {
    const files = requiredPrompts.map((f) => join(promptsDir, f));
    files.forEach((file) => {
      const content = readFileSync(file, 'utf-8');
      expect(content).toContain('## Escalation Rules');
    });
  });
});
    const config = await import('../config/index.ts')
    expect(config).toBeDefined()
  })

  it('should import utils without errors', () => {
    const utils = await import('../utils/index.ts')
    expect(utils).toBeDefined()
  })
})
