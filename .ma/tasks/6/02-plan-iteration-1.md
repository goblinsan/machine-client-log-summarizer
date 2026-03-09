# Plan Iteration 1

Generated: 2026-03-09T15:26:28.517Z

## Implementation Plan

### Step 1: Create path extraction utility for Windows file paths and repo URLs

**Files:** `src/utils/pathExtractor.ts`, `src/types/pathData.ts`

**Dependencies:**
  - src/utils/jsonPreviewParser.ts
  - src/utils/logEventNormalizer.ts

**Acceptance Criteria:**
  - Extract Windows paths matching C:\... pattern
  - Extract repo URLs from message/meta fields
  - Normalize paths to consistent format (forward slashes or backslashes)
  - Store extracted paths in dedicated paths object/field
  - TypeScript compilation succeeds without errors

### Step 2: Define path data types for extracted Windows paths and repo URLs

**Files:** `src/types/pathData.ts`

**Dependencies:**
  - src/types/index.ts

**Acceptance Criteria:**
  - PathData interface defined with normalizedPath, originalPath, repoUrl fields
  - Types exported from src/types/index.ts
  - TypeScript compilation succeeds

### Step 3: Integrate path extraction into existing log/event processing

**Files:** `src/utils/logEventNormalizer.ts`, `src/utils/jsonPreviewParser.ts`

**Dependencies:**
  - src/utils/pathExtractor.ts
  - src/types/pathData.ts

**Acceptance Criteria:**
  - Path extraction called during message/meta processing
  - Extracted paths stored in normalized output object
  - No breaking changes to existing functionality

## Risks

1. No test files detected in repository - manual verification required
2. Windows path normalization may conflict with existing path handling in logEventNormalizer.ts
3. Privacy controls implementation not yet defined - may need additional review

## Open Questions

1. What specific privacy control format is required for stored paths?
2. Should extracted paths be redacted or flagged in UI?
3. What is the expected storage location for normalized paths (state, storage, API)?

## Notes

1. Repository uses TypeScript as primary language - all new files must use .ts extension
2. Existing utils in src/utils/ should be extended, not replaced
3. Consider adding unit tests in tests/ directory if created
4. Review reviewer payloads for any specific path normalization requirements

