# Plan Iteration 3

Generated: 2026-03-08T14:46:27.835Z

## Implementation Plan

### Step 1: Create LogEvent schema definition with all required fields (ts, level, persona, workflowId, intent, repo, branch, projectId, corrId, duration_ms, preview_raw/json, paths, source, hash)

**Files:** `src/types/log-event.ts`

**Dependencies:**
  - TypeScript types
  - No external dependencies

**Acceptance Criteria:**
  - LogEvent interface defined with all 13 required fields
  - Type-safe structure for all field types
  - File located in src/types/ directory

### Step 2: Implement LogEvent type mapping function to classify raw messages into worker_ready, request_started, git_op, persona_response, persona_apply, persona_completed, unknown

**Files:** `src/utils/log-event-normalizer.ts`

**Dependencies:**
  - src/types/log-event.ts
  - TypeScript utility functions

**Acceptance Criteria:**
  - Function accepts raw message object
  - Returns normalized LogEvent with correct type classification
  - Handles unknown type for unrecognized messages
  - Maps all 13 fields from raw to normalized

### Step 3: Export LogEvent types and normalizer utilities for use across the application

**Files:** `src/index.ts`

**Dependencies:**
  - src/types/log-event.ts
  - src/utils/log-event-normalizer.ts

**Acceptance Criteria:**
  - LogEvent type exported from src/index.ts
  - normalizeLogEvent function exported from src/index.ts
  - Consistent export pattern with existing src/ structure

## Risks

1. Raw message format may vary - need to handle edge cases for unknown types
2. Field naming conventions may differ in raw messages - need normalization logic
3. TypeScript strict mode may require additional type guards

## Open Questions

1. What is the expected format of preview_raw/json field (stringified JSON or object)?
2. Are there any existing logging utilities in the repo to integrate with?
3. Should this be a standalone module or integrated into existing services?

## Notes

1. Picking src/ as the primary location for new utilities
2. Will use TypeScript for type safety as per repo primary language
3. No external dependencies needed - keep it lightweight
4. Follow existing src/ directory structure patterns

