# Plan Iteration 1

Generated: 2026-03-12T07:02:36.988Z

## Implementation Plan

### Step 1: Review existing LogEvent type definitions and normalizer implementation to understand current state

**Files:** `src/types/logEvent.ts`, `src/utils/logEventNormalizer.ts`, `src/utils/logEventNormalizer.test.ts`

**Dependencies:**

### Step 2: Define complete LogEvent schema with all required fields (ts, level, persona, workflowId, intent, repo, branch, projectId, corrId, duration_ms, preview_raw/json, paths, source, hash)

**Files:** `src/types/logEvent.ts`

**Dependencies:**
  - src/types/logEvent.ts

### Step 3: Implement message type mapping logic for all 7 types (worker_ready, request_started, git_op, persona_response, persona_apply, persona_completed, unknown)

**Files:** `src/utils/logEventNormalizer.ts`

**Dependencies:**
  - src/types/logEvent.ts

### Step 4: Add unit tests for each message type mapping scenario

**Files:** `src/utils/logEventNormalizer.test.ts`

**Dependencies:**
  - src/utils/logEventNormalizer.ts
  - src/types/logEvent.ts

### Step 5: Update package.json if new dependencies are required for schema validation or type checking

**Files:** `package.json`

**Dependencies:**

### Step 6: Verify TypeScript compilation and run test suite to confirm implementation

**Files:** `tsconfig.json`, `vitest.config.ts`, `src/utils/logEventNormalizer.ts`, `src/utils/logEventNormalizer.test.ts`

**Dependencies:**
  - src/utils/logEventNormalizer.ts
  - src/utils/logEventNormalizer.test.ts

## Risks

1. Existing logEventNormalizer.ts may have partial implementation that conflicts with new schema
2. Test file may need significant refactoring to cover all 7 message types
3. Schema changes may break downstream consumers if not versioned properly

## Open Questions

1. What is the expected format for preview_raw/json field (string vs object)?
2. Are there any existing raw message samples in the repository to validate against?
3. Should unknown type include a reason field for debugging?

