# Plan Iteration 3

Generated: 2026-03-09T16:00:39.255Z

## Implementation Plan

### Step 1: Create hash utility function for idempotency computation

**Files:** `src/utils/hash.ts`

**Dependencies:**
  - src/types/index.ts

**Acceptance Criteria:**
  - Hash function accepts ts|msg|persona|workflowId|corrId|preview_raw[:512] fields
  - Output is deterministic for identical inputs
  - File uses TypeScript with allowed extensions

### Step 2: Define hash computation types and interfaces

**Files:** `src/types/index.ts`

**Dependencies:**
  - src/utils/hash.ts

**Acceptance Criteria:**
  - HashRecord interface defined with required fields
  - Type definitions use TypeScript
  - No breaking changes to existing types

### Step 3: Implement deduplication logic in main application

**Files:** `src/App.tsx`

**Dependencies:**
  - src/utils/hash.ts
  - src/types/index.ts

**Acceptance Criteria:**
  - Hash computed before record processing
  - Duplicate records suppressed based on hash
  - Re-ingest produces identical counts

### Step 4: Add hash validation tests

**Files:** `src/utils/hash.test.ts`

**Dependencies:**
  - src/utils/hash.ts

**Acceptance Criteria:**
  - Test file uses TypeScript
  - Tests verify deterministic hash output
  - Tests verify duplicate suppression

## Risks

1. No existing test files detected - tests will be new additions
2. Hash algorithm choice impacts performance vs collision resistance
3. Integration with existing App.tsx may require careful refactoring

## Open Questions

1. Which hash algorithm to use (SHA-256, MD5, or custom)?
2. Where to store deduplication state (in-memory vs persisted)?
3. What is the expected record volume for hash cache sizing?

## Notes

1. All deliverables must use TypeScript (.ts) or JavaScript (.js) extensions
2. Hash function should be pure and deterministic
3. Consider adding hash to existing logEvent.ts types if applicable

