# Repository Context Summary

Generated: 2026-07-10T01:35:07.424Z

## Overview

- **Primary Language**: TypeScript
- **Other Languages**: JavaScript
- **Tooling & Frameworks**: Node.js (package.json), TypeScript compiler (tsconfig.json), Vitest test runner

## Local Environment Setup

- **Node.js dependencies** (Detected package.json)
  - `npm install --no-package-lock`
  - Evidence: package.json, package-lock.json

## Statistics

- **Total Files**: 84
- **Total Size**: 391.90 KB
- **Max Depth**: 10

## Directory Structure

```
.DS_Store (6.0KB)
.env.example (0.8KB)
.gitignore (0.2KB)
.ma/base_qa_cache_0d5c4f82a534db163e9938fff950d8963206d610.json (0.1KB)
.ma/base_qa_cache_4a6bc79e29c7fd26e303f8a335e34faf19dee381.json (18.0KB)
.ma/base_qa_cache_50d830e05dd17924200c5ed8c43476ae9c851ba5.json (2.5KB)
.ma/base_qa_cache_8c321e52cf1e671280f4ec538775247f9975badf.json (1.5KB)
.ma/base_qa_cache_d1a1298107efe5236c2b4649401a454f74e87ef5.json (1.4KB)
.ma/context/files.ndjson (7.2KB)
.ma/context/snapshot.json (10.8KB)
.ma/context/summary.md (17.1KB)
.stylelintrc.json (0.5KB)
index.html (0.3KB)
package-lock.json (159.5KB)
package.json (1.1KB)
PROJECT_PLAN.md (1.1KB)
README.md (0.2KB)
scripts/replace-colors.js (4.4KB)
SECURITY_GUIDELINES.md (2.8KB)
src/__tests__/batched-writer.test.ts (1.8KB)
src/__tests__/config-loader.test.ts (8.9KB)
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

- `.ma/context/snapshot.json` (10.8KB, 509 lines)
- `.ma/context/summary.md` (17.1KB, 215 lines)
- `package-lock.json` (159.5KB, 4765 lines)
- `src/__tests__/config-loader.test.ts` (8.9KB, 250 lines)
- `src/__tests__/qa-notes.md` (14.1KB, 494 lines)
- `src/config/data-packs/synthetic-log-runs.ts` (6.1KB, 245 lines)
- `src/config/prompts/context.md` (16.2KB, 448 lines)

## File Types

- .ts: 45 files
- .json: 10 files
- .md: 10 files
- .scss: 9 files
- .tsx: 4 files
- (no extension): 2 files
- .example: 1 file
- .ndjson: 1 file
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
- Line 51, Col 7: error TS2322: Type 'null' is not assignable to type 'string | undefined'.
- Line 52, Col 7: error TS2322: Type 'null' is not assignable to type 'string | undefined'.
- Line 53, Col 7: error TS2322: Type 'null' is not assignable to type 'string | undefined'.
- Line 162, Col 21: error TS2339: Property 'logPath' does not exist on type 'Partial<{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }>'.
- Line 174, Col 7: error TS2322: Type 'null' is not assignable to type 'string | undefined'.
- Line 175, Col 7: error TS2322: Type 'null' is not assignable to type 'string | undefined'.
- Line 176, Col 7: error TS2322: Type 'null' is not assignable to type 'string | undefined'.
- Line 194, Col 21: error TS2339: Property 'logPath' does not exist on type 'Partial<{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }>'.
- Line 195, Col 21: error TS2339: Property 'logLevel' does not exist on type 'Partial<{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }>'.
- Line 196, Col 21: error TS2339: Property 'lmStudioEndpoint' does not exist on type 'Partial<{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }>'.

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
- Line 54, Col 20: error TS2339: Property 'timeout' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.
- Line 55, Col 20: error TS2339: Property 'storePath' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.
- Line 56, Col 20: error TS2339: Property 'storeType' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.
- Line 57, Col 20: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.
- Line 58, Col 20: error TS2339: Property 'appName' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.
- Line 59, Col 20: error TS2339: Property 'version' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.
- Line 60, Col 20: error TS2339: Property 'batchSize' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.
- Line 61, Col 20: error TS2339: Property 'maxRetries' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.
- Line 62, Col 20: error TS2339: Property 'env' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.
- Line 65, Col 20: error TS2339: Property 'allowCors' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.
- Line 66, Col 20: error TS2339: Property 'corsOrigins' does not exist on type '{ enableStreaming: ZodDefault<ZodBoolean>; enableCache: ZodDefault<ZodBoolean>; export: ZodObject<{ type: ZodDefault<ZodEnum<["console", "file"]>>; path: ZodOptional<...>; }, "strip", ZodTypeAny, { ...; }, { ...; }>; }'.

### File: src/__tests__/retention-engine.test.ts
- Line 9, Col 5: error TS2353: Object literal may only specify known properties, and 'retentionDays' does not exist in type 'Partial<{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }>'.
- Line 22, Col 61: error TS2322: Type '"test"' is not assignable to type 'LogEventType'.
- Line 23, Col 61: error TS2322: Type '"test"' is not assignable to type 'LogEventType'.
- Line 28, Col 22: error TS2339: Property 'id' does not exist on type 'LogEvent'.
- Line 34, Col 46: error TS2322: Type '"test"' is not assignable to type 'LogEventType'.
- Line 35, Col 46: error TS2322: Type '"test"' is not assignable to type 'LogEventType'.
- Line 43, Col 22: error TS2339: Property 'id' does not exist on type 'LogEvent'.
- Line 48, Col 11: error TS2322: Type '{ id: string; timestamp: number; type: "test"; }[]' is not assignable to type 'LogEvent[]'.
- Line 59, Col 22: error TS2339: Property 'id' does not exist on type 'LogEvent'.
- Line 64, Col 11: error TS2322: Type '{ id: string; timestamp: number; type: "test"; }[]' is not assignable to type 'LogEvent[]'.

### File: src/__tests__/settings-panel.test.tsx
- Line 2, Col 43: error TS2307: Cannot find module '@testing-library/react' or its corresponding type declarations.
- Line 9, Col 3: error TS2304: Cannot find name 'beforeEach'.
- Line 10, Col 29: error TS2304: Cannot find name 'vi'.
- Line 22, Col 53: error TS2339: Property 'toBeInTheDocument' does not exist on type 'Assertion<any>'.
- Line 50, Col 67: error TS2339: Property 'toBeInTheDocument' does not exist on type 'Assertion<any>'.
- Line 51, Col 55: error TS2339: Property 'toBeInTheDocument' does not exist on type 'Assertion<any>'.

### File: src/__tests__/smoke.test.ts
- Line 16, Col 19: error TS2339: Property 'lmStudioEndpoint' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.

### File: src/App.tsx
- Line 2, Col 10: error TS2614: Module '"./App"' has no exported member 'App'. Did you mean to use 'import App from "./App"' instead?
- Line 3, Col 10: error TS2614: Module '"./utils/logEventNormalizer"' has no exported member 'normalizeLogEvent'. Did you mean to use 'import normalizeLogEvent from "./utils/logEventNormalizer"' instead?
- Line 5, Col 10: error TS2305: Module '"./types"' has no exported member 'HashRecord'.
- Line 5, Col 22: error TS2305: Module '"./types"' has no exported member 'PreviewParseResult'.

### File: src/config/cli.ts
- Line 18, Col 5: error TS2322: Type '{ 'log-path': { type: string; }; 'log-store': { type: string; }; 'lm-studio-endpoint': { type: string; }; model: { type: string; }; temperature: { type: string; }; 'max-tokens': { type: string; }; 'enable-security': { ...; }; 'enable-qa': { ...; }; help: { ...; }; }' is not assignable to type 'ParseArgsOptionsConfig'.

### File: src/config/compaction-job.ts
- Line 24, Col 30: error TS2339: Property 'enableCompaction' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.
- Line 25, Col 28: error TS2339: Property 'compactionSchedule' does not exist on type '{ enableStreaming: boolean; enableCache: boolean; export: { type: "file" | "console"; path?: string | undefined; }; }'.

### File: src/config/defaults.ts
- Line 4, Col 3: error TS2353: Object literal may only specify known properties, and 'logPath' does not exist in type 'Par

### Other Diagnostics
```
Type '{ id: string; timestamp: number; type: "test"; }' is missing the following properties from type 'LogEvent': ts, level
Type '{ id: string; timestamp: number; type: "test"; }' is missing the following properties from type 'LogEvent': ts, level
Property ''log-path'' is incompatible with index signature.
Type '{ type: string; }' is not assignable to type 'ParseArgsOptionConfig'.
Types of property 'type' are incompatible.
Type 'string' is not assignable to type '"string" | "boolean"'.
```
