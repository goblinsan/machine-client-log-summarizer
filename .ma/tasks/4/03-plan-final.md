# Plan Iteration 1

Generated: 2026-03-11T19:45:43.975Z

## Implementation Plan

### Step 1: Define LogEvent schema with all required fields in src/types/logEvent.ts

**Files:** `src/types/logEvent.ts`

**Dependencies:**
  - src/types/index.ts

**Acceptance Criteria:**
  - Schema includes all required fields: ts, level, persona, workflowId, intent, repo, branch, projectId, corrId, duration_ms, preview_raw/json, paths, source, hash
  - Schema uses TypeScript interfaces/types with proper typing for preview (string | object)
  - File exports the LogEvent type for use across the codebase

### Step 2: Implement type mapping logic in src/utils/logEventNormalizer.ts

**Files:** `src/utils/logEventNormalizer.ts`

**Dependencies:**
  - src/types/logEvent.ts
  - src/utils/hash.ts

**Acceptance Criteria:**
  - Normalizer maps raw messages to one of: worker_ready, request_started, git_op, persona_response, persona_apply, persona_completed, unknown
  - Mapping logic handles all field variations from raw messages
  - Function returns normalized LogEvent with all required fields populated
  - Unknown type assigned when message doesn't match known patterns

### Step 3: Add unit tests for logEventNormalizer

**Files:** `src/utils/logEventNormalizer.test.ts`

**Dependencies:**
  - src/utils/logEventNormalizer.ts
  - src/types/logEvent.ts

**Acceptance Criteria:**
  - Test coverage for all persona types (worker_ready, request_started, git_op, persona_response, persona_apply, persona_completed)
  - Test coverage for unknown type fallback
  - Test coverage for hash field generation
  - Tests verify all required fields are present in output

### Step 4: Export types and normalizer from src/types/index.ts and src/utils/index.ts

**Files:** `src/types/index.ts`, `src/utils/index.ts`

**Dependencies:**
  - src/types/logEvent.ts
  - src/utils/logEventNormalizer.ts

**Acceptance Criteria:**
  - LogEvent type exported from src/types/index.ts
  - normalizeLogEvent function exported from src/utils/index.ts
  - Exports are consistent with existing module patterns

## Risks

1. Raw message format may vary across different sources - need to handle edge cases in mapping logic
2. Hash field may require specific algorithm - verify hash.ts implementation matches requirements
3. Preview field may be string or JSON object - need to handle both types correctly

## Open Questions

1. What is the expected hash algorithm for the hash field?
2. Are there any specific timestamp formats required for the ts field?
3. What is the expected structure of preview_raw vs preview_json fields?

## Notes

1. Existing src/types/logEvent.ts (1.2KB) and src/utils/logEventNormalizer.ts (1.3KB) should be reviewed before modifications
2. All work must stay within TypeScript/JavaScript - no new languages or platforms
3. Files must be inside repository root (src/, tests/, etc.) - no .ma/ or context exports as deliverables
4. PICK ONE PATH: prefer src/types/logEvent.ts over src/config/index.ts for schema definition

