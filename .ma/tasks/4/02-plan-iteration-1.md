# Plan Iteration 1

Generated: 2026-03-08T18:11:28.312Z

## Implementation Plan

### Step 1: Create LogEvent type definitions in src/types/logEvent.ts

**Files:** `src/types/logEvent.ts`

**Dependencies:**
  - src/types/index.ts (if exists) or create new types module

**Acceptance Criteria:**
  - LogEvent interface defined with all required fields: ts, level, persona, workflowId, intent, repo, branch, projectId, corrId, duration_ms, preview_raw/json, paths, source, hash
  - Type mapping enum/object defined for: worker_ready, request_started, git_op, persona_response, persona_apply, persona_completed, unknown
  - File uses TypeScript with proper JSDoc comments for schema documentation

### Step 2: Implement LogEvent normalizer utility in src/utils/logEventNormalizer.ts

**Files:** `src/utils/logEventNormalizer.ts`

**Dependencies:**
  - src/types/logEvent.ts (must exist first)

**Acceptance Criteria:**
  - Normalizer function maps raw message objects to typed LogEvent instances
  - Type detection logic handles all 7 message types plus unknown fallback
  - Preview generation logic for raw/json fields implemented
  - Error handling for malformed input messages

### Step 3: Export types and normalizer from main types/utils entry points

**Files:** `src/types/index.ts`, `src/utils/index.ts`

**Dependencies:**
  - src/types/logEvent.ts
  - src/utils/logEventNormalizer.ts

**Acceptance Criteria:**
  - Types exported from src/types/index.ts
  - Normalizer exported from src/utils/index.ts
  - No circular dependencies introduced

## Risks

1. Existing src/types/index.ts may need review to avoid conflicts with new LogEvent types
2. Preview_raw/json field may need clarification on format expectations from reviewer payloads

## Open Questions

1. Should preview_raw/json be stored as stringified JSON or separate raw/json fields?
2. What is the expected source field format (file path, line number, or both)?
3. Are there existing logging utilities in the repo to integrate with?

