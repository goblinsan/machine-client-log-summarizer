# Plan Iteration 1

Generated: 2026-03-12T01:31:30.506Z

## Implementation Plan

### Step 1: Define LogEvent schema with all required fields (ts, level, persona, workflowId, intent, repo, branch, projectId, corrId, duration_ms, preview_raw/json, paths, source, hash)

**Files:** `src/types/logEvent.ts`

**Dependencies:**

**Acceptance Criteria:**
  - LogEvent interface includes all 14 required fields with appropriate types
  - preview field supports both raw string and JSON object variants
  - paths field supports array of strings
  - All fields are optional except ts and level (required for valid events)

### Step 2: Implement type mapping logic to classify raw messages into event types (worker_ready, request_started, git_op, persona_response, persona_apply, persona_completed, unknown)

**Files:** `src/utils/logEventNormalizer.ts`

**Dependencies:**
  - src/types/logEvent.ts

**Acceptance Criteria:**
  - Normalizer exports function to classify raw messages into event types
  - Each event type has clear classification rules based on message content
  - Unknown type is used for unrecognized message patterns
  - Normalizer extracts and normalizes all 14 fields from raw messages

### Step 3: Add comprehensive tests for LogEvent schema and normalizer type mapping logic

**Files:** `src/utils/logEventNormalizer.test.ts`

**Dependencies:**
  - src/types/logEvent.ts
  - src/utils/logEventNormalizer.ts

**Acceptance Criteria:**
  - Tests cover all 7 event types with representative raw message examples
  - Tests verify field extraction accuracy for each event type
  - Tests include edge cases (missing fields, malformed messages)
  - Tests verify unknown type classification for unrecognized patterns

### Step 4: Update existing hash utility to support LogEvent hash field generation if needed

**Files:** `src/utils/hash.ts`, `src/utils/hash.test.ts`

**Dependencies:**

**Acceptance Criteria:**
  - Hash utility supports generating hash from LogEvent data
  - Hash generation is deterministic for same input
  - Existing hash tests pass with new functionality

## Risks

1. Existing logEventNormalizer.ts may have partial implementation requiring careful integration
2. Raw message format may vary across different worker implementations
3. Schema field naming conventions must align with existing codebase patterns

## Open Questions

1. What is the expected raw message format from different worker types?
2. Are there any existing logEvent examples in the codebase to reference?
3. What hash algorithm should be used for the hash field (SHA256, MD5, etc.)?

## Notes

1. Focus on src/types/logEvent.ts for schema definition
2. Focus on src/utils/logEventNormalizer.ts for mapping logic
3. Use Vitest for testing (existing test runner)
4. Maintain TypeScript strict typing throughout
5. Keep implementation within src/ directory structure

