# Plan Iteration 1

Generated: 2026-03-09T15:21:19.505Z

## Implementation Plan

### Step 1: Create JSON preview parser utility function in src/utils/

**Files:** `src/utils/jsonPreviewParser.ts`

**Dependencies:**
  - src/utils/index.ts

**Acceptance Criteria:**
  - Function parses JSON from fenced (```json) and bare JSON content
  - Returns preview_json object with status (pass|fail) on valid parse
  - Returns preview_raw string on invalid parse
  - Type-safe TypeScript implementation with proper error handling

### Step 2: Export new utility from utils index barrel file

**Files:** `src/utils/index.ts`

**Dependencies:**
  - src/utils/jsonPreviewParser.ts

**Acceptance Criteria:**
  - jsonPreviewParser exported from index.ts
  - No breaking changes to existing exports

### Step 3: Add TypeScript type definitions for preview data structures

**Files:** `src/types/index.ts`

**Dependencies:**
  - src/utils/jsonPreviewParser.ts

**Acceptance Criteria:**
  - PreviewJson interface defined with status field
  - PreviewRaw type for raw string content
  - Types exported from index.ts

## Risks

1. JSON parsing edge cases with malformed content
2. Nested JSON structures with status at different levels

## Open Questions

1. Should the parser handle minified vs pretty-printed JSON?
2. What status values are valid beyond pass/fail?

## Notes

1. Must handle both fenced (```json) and bare JSON formats
2. Keep implementation small and focused on parsing logic
3. Follow existing TypeScript patterns in src/utils/
4. No .ma/ or automation artifacts as deliverables

