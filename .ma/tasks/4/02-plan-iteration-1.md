# Plan Iteration 1

Generated: 2026-03-12T12:19:19.914Z

## Implementation Plan

### Step 1: Review existing LogEvent schema and normalizer implementation to understand current state

**Files:** `src/types/logEvent.ts`, `src/utils/logEventNormalizer.ts`, `src/utils/logEventNormalizer.test.ts`

**Dependencies:**

### Step 2: Define complete LogEvent schema with all required fields (ts, level, persona, workflowId, intent, repo, branch, projectId, corrId, duration_ms, preview_raw/json, paths, source, hash)

**Files:** `src/types/logEvent.ts`

**Dependencies:**
  - step 1

### Step 3: Implement type mapping logic to classify raw messages into types (worker_ready, request_started, git_op, persona_response, persona_apply, persona_completed, unknown)

**Files:** `src/utils/logEventNormalizer.ts`

**Dependencies:**
  - step 2

### Step 4: Add/update tests to cover all message type mappings and edge cases

**Files:** `src/utils/logEventNormalizer.test.ts`

**Dependencies:**
  - step 3

### Step 5: Run tests and verify all mappings work correctly

**Files:** `src/utils/logEventNormalizer.test.ts`, `vite.config.ts`

**Dependencies:**
  - step 4

## Risks

1. Existing schema may conflict with new field requirements
2. Type mapping logic may need to handle malformed input gracefully
3. Test coverage may be incomplete for edge cases

## Open Questions

1. What is the expected format for preview_raw/json field (stringified JSON or object)?
2. Are there any existing message type examples in the codebase to reference?
3. What is the expected source field value (e.g., 'worker', 'api', 'cli')?

