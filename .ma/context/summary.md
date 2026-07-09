# Repository Context Summary

Generated: 2026-07-09T04:51:32.652Z

## Overview

- **Primary Language**: TypeScript
- **Other Languages**: JavaScript
- **Tooling & Frameworks**: Node.js (package.json), TypeScript compiler (tsconfig.json), Vitest test runner

## Local Environment Setup

- **Node.js dependencies** (Detected package.json)
  - `npm install --no-package-lock`
  - Evidence: package.json, package-lock.json

## Statistics

- **Total Files**: 80
- **Total Size**: 356.05 KB
- **Max Depth**: 10

## Directory Structure

```
.DS_Store (6.0KB)
.env.example (0.8KB)
.gitignore (0.2KB)
.ma/base_qa_cache_4a6bc79e29c7fd26e303f8a335e34faf19dee381.json (18.0KB)
.ma/base_qa_cache_50d830e05dd17924200c5ed8c43476ae9c851ba5.json (2.5KB)
.ma/base_qa_cache_8c321e52cf1e671280f4ec538775247f9975badf.json (1.5KB)
.ma/base_qa_cache_d1a1298107efe5236c2b4649401a454f74e87ef5.json (1.4KB)
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
src/App.tsx (4.5KB)
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
src/config/schema.ts (0.7KB)
src/config/synthetic-logs-data.ts (1.0KB)
src/config/synthetic-logs.ts (3.9KB)
src/main.tsx (0.5KB)
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
- .json: 8 files
- .tsx: 4 files
- (no extension): 2 files
- .example: 1 file
- .html: 1 file
- .js: 1 file

## Compilation Diagnostics

### File: src/__tests__/batched-writer.test.ts
- Line 7, Col 29: error TS2304: Cannot find name 'vi'.
- Line 20, Col 41: error TS2322: Type '"test"' is not assignable to type 'LogEventType'.
- Line 21, Col 41: error TS2322: Type '"test"' is not assignable to type 'LogEventType'.
- Line 22, Col 41: error TS2322: Type '"test"' is not assignable to type 'LogEventType'.
- Line 31, Col 63: error TS2322: Type '"test"' is not assignable to type 'LogEventType'.
- Line 42, Col 63: error TS2322: Type '"test"' is not assignable to type 'LogEventType'.
- Line 52, Col 63: error TS2322: Type '"test"' is not assignable to type 'LogEventType'.

### File: src/__tests__/config-loader.test.ts
- Line 15, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 16, Col 21: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 17, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 25, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 26, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 33, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 42, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 43, Col 21: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 44, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 48, Col 7: error TS2322: Type 'null' is not assignable to type 'string | undefined'.
- Line 49, Col 7: error TS2322: Type 'null' is not assignable to type 'string | undefined'.
- Line 50, Col 7: error TS2322: Type 'null' is not assignable to type 'string | undefined'.
- Line 53, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 54, Col 21: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 55, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 64, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 65, Col 21: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 66, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 75, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 76, Col 21: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 77, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 85, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 94, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 95, Col 21: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 96, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 105, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 106, Col 21: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 107, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 116, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 117, Col 21: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 118, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 127, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 128, Col 21: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 129, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 138, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 139, Col 21: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 140, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 157, Col 21: error TS2339: Property 'logPath' does not exist on type 'Partial<{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }>'.
- Line 169, Col 7: error TS2322: Type 'null' is not assignable to type 'string | undefined'.
- Line 170, Col 7: error TS2322: Type 'null' is not assignable to type 'string | undefined'.
- Line 171, Col 7: error TS2322: Type 'null' is not assignable to type 'string | undefined'.
- Line 189, Col 21: error TS2339: Property 'logPath' does not exist on type 'Partial<{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }>'.
- Line 190, Col 21: error TS2339: Property 'logLevel' does not exist on type 'Partial<{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }>'.
- Line 191, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type 'Partial<{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }>'.

### File: src/__tests__/config.test.ts
- Line 9, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 10, Col 21: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 11, Col 21: error TS2339: Property 'timeout' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 12, Col 21: error TS2339: Property 'storePath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 13, Col 21: error TS2339: Property 'storeType' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 14, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 15, Col 21: error TS2339: Property 'appName' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 16, Col 21: error TS2339: Property 'version' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 17, Col 21: error TS2339: Property 'batchSize' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 18, Col 21: error TS2339: Property 'maxRetries' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 19, Col 21: error TS2339: Property 'env' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 22, Col 21: error TS2339: Property 'allowCors' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 23, Col 21: error TS2339: Property 'corsOrigins' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 27, Col 35: error TS2353: Object literal may only specify known properties, and 'logLevel' does not exist in type 'Partial<{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }>'.
- Line 29, Col 21: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 30, Col 21: error TS2339: Property 'timeout' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 31, Col 21: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 43, Col 23: error TS2339: Property 'logPath' does not exist on type 'Partial<{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }>'.
- Line 44, Col 23: error TS2339: Property 'logLevel' does not exist on type 'Partial<{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }>'.
- Line 52, Col 20: error TS2339: Property 'logPath' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.
- Line 53, Col 20: error TS2339: Property 'logLevel' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.
- Line 54, Col 20: error TS2339: Property 'timeout' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<Zo

