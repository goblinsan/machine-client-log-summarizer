# Plan Iteration 1

Generated: 2026-03-12T18:37:58.752Z

## Implementation Plan

### Step 1: Define the LogEvent schema with all required fields (ts, level, persona, workflowId, intent, repo, branch, projectId, corrId, duration_ms, preview_raw/json, paths, source, hash) in src/types/logEvent.ts

**Files:** `src/types/logEvent.ts`

**Dependencies:**
  - src/types/index.ts

**Acceptance Criteria:**
  - LogEvent interface includes all 13 required fields with appropriate types
  - preview field supports both raw string and JSON object variants
  - paths field is array of string paths
  - All fields are optional except ts and level (required for valid events)

### Step 2: Implement type mapping logic in src/utils/logEventNormalizer.ts to map raw messages to event types (worker_ready, request_started, git_op, persona_response, persona_apply, persona_completed, unknown)

**Files:** `src/utils/logEventNormalizer.ts`

**Dependencies:**
  - src/types/logEvent.ts
  - src/utils/logEventNormalizer.test.ts

**Acceptance Criteria:**
  - Normalizer exports a function that accepts raw message object
  - Returns normalized LogEvent with correct type field
  - Unknown type assigned when no matching pattern found
  - All 7 event types have explicit mapping rules
  - Duration_ms field is normalized to number (ms)

### Step 3: Update unit tests in src/utils/logEventNormalizer.test.ts to cover all event types and edge cases

**Files:** `src/utils/logEventNormalizer.test.ts`

**Dependencies:**
  - src/utils/logEventNormalizer.ts
  - src/types/logEvent.ts

**Acceptance Criteria:**
  - Test cases for all 7 event types (worker_ready, request_started, git_op, persona_response, persona_apply, persona_completed, unknown)
  - Test cases for missing/invalid fields
  - Test cases for preview_raw vs preview_json variants
  - Test cases for duration_ms normalization
  - All tests pass with Vitest

### Step 4: Verify build and test pipeline with existing tooling

**Files:** `vite.config.ts`, `vitest.config.ts`, `package.json`

**Dependencies:**
  - src/types/logEvent.ts
  - src/utils/logEventNormalizer.ts
  - src/utils/logEventNormalizer.test.ts

**Acceptance Criteria:**
  - npm run build succeeds without errors
  - npm run test passes all test cases
  - No TypeScript compilation errors
  - No ESLint errors in modified files

## Risks

1. Existing logEventNormalizer.ts may have partial implementation that conflicts with new schema
2. Preview field may need backward compatibility for existing raw/json formats
3. Test coverage may be incomplete for edge cases in raw message parsing

## Open Questions

1. What is the expected format of preview_raw vs preview_json in incoming messages?
2. Are there any existing message samples in the repository to reference?
3. What is the expected behavior for duration_ms when not provided in raw message?

## Notes

1. Focus on src/types/logEvent.ts for schema definition
2. Focus on src/utils/logEventNormalizer.ts for mapping logic
3. Focus on src/utils/logEventNormalizer.test.ts for test coverage
4. Do not create new files; enhance existing ones only
5. All work must be in TypeScript (primary language)
6. Use Vitest for testing (existing test runner)

