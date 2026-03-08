# Plan Iteration 1

Generated: 2026-03-08T18:16:51.217Z

## Implementation Plan

### Step 1: Define TypeScript types for preview content structure (preview_json, preview_raw, status)

**Files:** `src/types/preview.ts`

**Dependencies:**
  - src/types/index.ts

**Acceptance Criteria:**
  - Types exported for PreviewData, PreviewStatus (pass|fail)
  - Type definitions match task requirements for preview_json and preview_raw

### Step 2: Implement preview content parser utility that handles both fenced and bare JSON formats

**Files:** `src/utils/previewParser.ts`

**Dependencies:**
  - src/types/preview.ts
  - src/utils/index.ts

**Acceptance Criteria:**
  - Parser detects ```json fences and extracts inner content
  - Parser handles bare JSON without fences
  - Returns {preview_json, status: 'pass'} on valid JSON
  - Returns {preview_raw, status: 'fail'} on invalid JSON
  - Uses JSON.parse for validation

### Step 3: Export preview parser from utils index

**Files:** `src/utils/index.ts`

**Dependencies:**
  - src/utils/previewParser.ts

**Acceptance Criteria:**
  - previewParser exported from utils index
  - No breaking changes to existing exports

## Risks

1. JSON.parse may throw on malformed JSON - must catch and return preview_raw
2. Fenced JSON may have trailing content after closing fence - must extract only fenced portion

## Open Questions

1. Should parser handle escaped newlines in fenced JSON content?
2. What is the expected output shape for preview_json vs preview_raw?

## Notes

1. All files must be in src/ directory structure
2. Use TypeScript only (no JavaScript files)
3. Parser should be pure function with no side effects
4. Consider adding JSDoc comments for API documentation

