# Plan Iteration 1

Generated: 2026-03-12T21:54:13.023Z

## Implementation Plan

### Step 1: Analyze existing log event parsing and preview handling patterns in the codebase to determine implementation location

**Files:** `src/types/logEvent.ts`, `src/utils/logEventNormalizer.ts`, `src/utils/logEventNormalizer.test.ts`

**Dependencies:**
  - context_analysis/summary

**Acceptance Criteria:**
  - Identify existing preview parsing patterns
  - Confirm no existing preview_json handling exists
  - Determine if new utility or existing normalizer should be modified

### Step 2: Implement preview parsing logic that handles both ```json fenced and bare JSON content

**Files:** `src/utils/logEventNormalizer.ts`

**Dependencies:**
  - step 1 completion

**Acceptance Criteria:**
  - Function parses ```json fenced JSON correctly
  - Function parses bare JSON correctly
  - Function returns preview_json on valid parse
  - Function extracts status (pass|fail) from parsed JSON
  - Function retains preview_raw on invalid parse

### Step 3: Add unit tests for preview parsing edge cases

**Files:** `src/utils/logEventNormalizer.test.ts`

**Dependencies:**
  - step 2 completion

**Acceptance Criteria:**
  - Test fenced JSON parsing
  - Test bare JSON parsing
  - Test invalid JSON handling
  - Test status extraction (pass/fail)
  - Test empty/null preview handling

### Step 4: Update TypeScript types to include preview_json and preview_raw fields

**Files:** `src/types/logEvent.ts`

**Dependencies:**
  - step 2 completion

**Acceptance Criteria:**
  - preview_json type defined
  - preview_raw type defined
  - status field (pass|fail) typed

### Step 5: Run tests and verify implementation

**Files:** `src/utils/logEventNormalizer.test.ts`, `vitest.config.ts`

**Dependencies:**
  - step 3 completion
  - step 4 completion

**Acceptance Criteria:**
  - All tests pass with vitest
  - No TypeScript compilation errors
  - Preview parsing works end-to-end

## Risks

1. Preview JSON structure may vary across different log events
2. Status field naming may differ (e.g., 'status', 'result', 'outcome')
3. Existing code may already handle preview parsing in unexpected locations

## Open Questions

1. What is the expected structure of preview JSON content?
2. Are there existing preview-related fields in logEvent.ts that need to be preserved?
3. Should preview parsing be synchronous or async?

