# Plan Iteration 1

Generated: 2026-03-12T21:26:09.250Z

## Implementation Plan

### Step 1: Define LogEvent schema with all required fields (ts, level, persona, workflowId, intent, repo, branch, projectId, corrId, duration_ms, preview_raw/json, paths, source, hash)

**Files:** `src/types/logEvent.ts`

**Dependencies:**
  - Existing src/types/logEvent.ts needs schema expansion

**Acceptance Criteria:**
  - LogEvent interface includes all 14 required fields with proper TypeScript types
  - preview field supports both raw string and JSON object variants
  - paths field is array of string paths
  - hash field is string (SHA256 or similar)

### Step 2: Implement type mapping logic in logEventNormalizer to classify raw messages into worker_ready, request_started, git_op, persona_response, persona_apply, persona_completed, unknown

**Files:** `src/utils/logEventNormalizer.ts`

**Dependencies:**
  - src/types/logEvent.ts schema must be complete first
  - Existing logEventNormalizer.ts needs type mapping implementation

**Acceptance Criteria:**
  - Normalizer exports function that accepts raw message object
  - Returns normalized LogEvent with type field set correctly
  - All 7 event types are handled with appropriate field extraction
  - Unknown type used for unrecognized message patterns

### Step 3: Add comprehensive test coverage for all event types and edge cases

**Files:** `src/utils/logEventNormalizer.test.ts`

**Dependencies:**
  - src/utils/logEventNormalizer.ts implementation complete
  - src/types/logEvent.ts schema complete

**Acceptance Criteria:**
  - Test cases for all 7 event types (worker_ready, request_started, git_op, persona_response, persona_apply, persona_completed, unknown)
  - Edge cases: missing fields, null values, empty strings
  - Test coverage >= 80% for normalizer module
  - Tests run successfully with Vitest

### Step 4: Update package.json exports if needed to expose normalizer and types

**Files:** `package.json`

**Dependencies:**
  - src/utils/logEventNormalizer.ts implementation complete
  - src/types/logEvent.ts schema complete

**Acceptance Criteria:**
  - Exports added for logEventNormalizer and logEvent types
  - No breaking changes to existing exports

## Risks

1. Existing logEventNormalizer.ts may have partial implementation that conflicts with new schema
2. Type mapping logic may need to handle malformed input gracefully
3. Test coverage requirements may need adjustment based on existing test structure

## Open Questions

1. What is the expected format for preview_raw vs preview_json fields?
2. What hashing algorithm should be used for hash field?
3. Are there any existing message format specifications in PROJECT_PLAN.md or README.md?

## Notes

1. Prioritize src/types/logEvent.ts schema definition first before implementing normalizer logic
2. Maintain backward compatibility with existing code where possible
3. Use Vitest config (vitest.config.ts) for test execution
4. All deliverables must be in src/ directory per repository structure

