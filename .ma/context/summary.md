# Repository Context Summary

Generated: 2026-07-09T02:43:03.803Z

## Overview

- **Primary Language**: TypeScript
- **Other Languages**: JavaScript
- **Tooling & Frameworks**: Node.js (package.json), TypeScript compiler (tsconfig.json), Vitest test runner

## Local Environment Setup

- **Node.js dependencies** (Detected package.json)
  - `npm install --no-package-lock`
  - Evidence: package.json, package-lock.json

## Statistics

- **Total Files**: 76
- **Total Size**: 333.19 KB
- **Max Depth**: 10

## Directory Structure

```
.DS_Store (6.0KB)
.env.example (0.8KB)
.gitignore (0.2KB)
.stylelintrc.json (0.5KB)
index.html (0.3KB)
package-lock.json (159.5KB)
package.json (1.1KB)
PROJECT_PLAN.md (1.1KB)
README.md (0.2KB)
scripts/replace-colors.js (4.4KB)
SECURITY_GUIDELINES.md (2.8KB)
src/__tests__/batched-writer.test.ts (1.8KB)
src/__tests__/config-loader.test.ts (8.3KB)
src/__tests__/config.test.ts (2.4KB)
src/__tests__/data-packs.test.ts (1.6KB)
src/__tests__/event-store-schema.test.ts (3.7KB)
src/__tests__/qa-notes.md (14.1KB)
src/__tests__/regression-gap.test.ts (1.7KB)
src/__tests__/retention-engine.test.ts (2.4KB)
src/__tests__/settings-panel.test.tsx (1.5KB)
src/__tests__/smoke.test.ts (0.5KB)
src/__tests__/synthetic-logs-data.test.ts (2.8KB)
src/__tests__/synthetic-logs.test.ts (2.0KB)
src/__tests__/validation-plan.ts (1.4KB)
src/App.tsx (5.2KB)
src/config/cli.ts (1.8KB)
src/config/compaction-job.ts (2.0KB)
src/config/data-packs/synthetic-log-runs.ts (6.1KB)
src/config/defaults.ts (0.4KB)
src/config/event-store-config.ts (2.1KB)
src/config/guardrails.ts (4.2KB)
src/config/index.ts (0.6KB)
src/config/loader.ts (1.9KB)
src/config/metrics-export.ts (2.2KB)
src/config/migrations/001_create_event_tables.ts (1.7KB)
src/config/prompts/context.md (16.2KB)
src/config/prompts/coordinator.md (3.7KB)
src/config/prompts/lead-engineer.md (3.9KB)
src/config/prompts/qa.md (3.6KB)
src/config/prompts/security.md (3.9KB)
src/config/retention-engine.ts (2.7KB)
src/config/schema.ts (0.3KB)
src/config/synthetic-logs-data.ts (1.0KB)
src/config/synthetic-logs.ts (4.0KB)
src/main.tsx (0.6KB)
src/settings-panel.tsx (1.1KB)
src/styles/_base.scss (1.7KB)
src/styles/_components.scss (3.3KB)
src/styles/_extras.scss (0.7KB)
src/styles/_index.scss (0.2KB)
src/styles/_layout.scss (1.0KB)
src/styles/_migrated.scss (3.4KB)
src/styles/_mixins.scss (0.2KB)
src/styles/_utils.scss (0.4KB)
src/styles/main.scss (0.4KB)
src/test/setup.ts (0.1KB)
src/types/eventTypes.ts (0.6KB)
src/types/index.ts (0.1KB)
src/types/logEvent.ts (1.6KB)
src/types/pathData.ts (0.7KB)
src/utils/batched-writer.ts (1.7KB)
src/utils/dedup.test.ts (4.1KB)
src/utils/dedup.ts (1.7KB)
src/utils/hash.test.ts (1.9KB)
src/utils/hash.ts (2.1KB)
src/utils/index.ts (0.1KB)
src/utils/jsonPreviewParser.ts (1.0KB)
src/utils/logEventNormalizer.test.ts (6.3KB)
src/utils/logEventNormalizer.ts (4.9KB)
src/utils/pathExtractor.test.ts (0.1KB)
src/utils/pathExtractor.ts (1.9KB)
src/utils/smoke.test.ts (0.5KB)
tsconfig.json (0.3KB)
vite.config.ts (0.6KB)
vitest.config.ts (0.4KB)
vitest.harness.ts (1.0KB)
```

## Large Files

- `package-lock.json` (159.5KB, 4765 lines)
- `src/__tests__/config-loader.test.ts` (8.3KB, 249 lines)
- `src/__tests__/qa-notes.md` (14.1KB, 494 lines)
- `src/config/data-packs/synthetic-log-runs.ts` (6.1KB, 245 lines)
- `src/config/prompts/context.md` (16.2KB, 448 lines)

## File Types

- .ts: 45 files
- .md: 9 files
- .scss: 9 files
- .json: 4 files
- .tsx: 4 files
- (no extension): 2 files
- .example: 1 file
- .html: 1 file
- .js: 1 file

## Compilation Diagnostics

```
src/App.tsx(82,7): error TS1005: ',' expected.
src/App.tsx(83,11): error TS1359: Identifier expected. 'const' is a reserved word that cannot be used here.
src/App.tsx(83,17): error TS1005: ',' expected.
src/App.tsx(83,46): error TS1005: ',' expected.
src/App.tsx(84,9): error TS1005: ',' expected.
src/App.tsx(88,7): error TS1128: Declaration or statement expected.
src/App.tsx(89,6): error TS1005: ')' expected.
src/App.tsx(93,11): error TS1005: 'try' expected.
src/App.tsx(96,9): error TS2657: JSX expressions must have one parent element.
src/App.tsx(101,7): error TS1128: Declaration or statement expected.
src/App.tsx(102,8): error TS17008: JSX element 'main' has no corresponding closing tag.
src/App.tsx(103,7): error TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
src/App.tsx(112,5): error TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
src/App.tsx(114,3): error TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
src/App.tsx(116,13): error TS2657: JSX expressions must have one parent element.
src/App.tsx(171,4): error TS1005: '}' expected.
src/App.tsx(172,1): error TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
src/App.tsx(175,1): error TS1005: '</' expected.
src/config/schema.ts(2,14): error TS1005: ';' expected.
src/config/schema.ts(7,1): error TS1109: Expression expected.
src/config/synthetic-logs.ts(5,9): error TS1005: ':' expected.
src/config/synthetic-logs.ts(5,13): error TS1005: ',' expected.
src/config/synthetic-logs.ts(5,18): error TS1005: ',' expected.
src/config/synthetic-logs.ts(5,19): error TS1109: Expression expected.
src/config/synthetic-logs.ts(5,21): error TS1005: ':' expected.
src/config/synthetic-logs.ts(5,25): error TS1005: ',' expected.
src/config/synthetic-logs.ts(6,12): error TS1005: ',' expected.
src/config/synthetic-logs.ts(6,17): error TS1005: ',' expected.
src/config/synthetic-logs.ts(6,19): error TS1005: ',' expected.
src/config/synthetic-logs.ts(6,28): error TS1005: ',' expected.
src/config/synthetic-logs.ts(6,30): error TS1005: ',' expected.
src/config/synthetic-logs.ts(6,31): error TS1005: ',' expected.
src/config/synthetic-logs.ts(6,35): error TS1005: ',' expected.
src/config/synthetic-logs.ts(7,9): error TS1005: ',' expected.
src/config/synthetic-logs.ts(7,14): error TS1005: ',' expected.
src/config/synthetic-logs.ts(16,9): error TS1109: Expression expected.
src/config/synthetic-logs.ts(17,1): error TS1128: Declaration or statement expected.
src/config/synthetic-logs.ts(19,1): error TS1109: Expression expected.
src/config/synthetic-logs.ts(19,2): error TS1128: Declaration or statement expected.
src/config/synthetic-logs.ts(22,2): error TS1109: Expression expected.
src/config/synthetic-logs.ts(22,3): error TS1161: Unterminated regular expression literal.
src/main.tsx(24,1): error TS1128: Declaration or statement expected.

```
