# Plan Iteration 1

Generated: 2026-03-12T22:01:01.470Z

## Implementation Plan

### Step 1: Analyze existing message/meta structure and identify where path/URL data is currently stored

**Files:** `src/types/logEvent.ts`, `src/utils/logEventNormalizer.ts`, `src/types/index.ts`

**Dependencies:**
  - Review logEvent.ts for existing message/meta schema

**Acceptance Criteria:**
  - Identify all message/meta fields that may contain paths or URLs
  - Document current storage locations for path/URL data

### Step 2: Design and implement Windows path extraction function

**Files:** `src/utils/pathExtractor.ts`

**Dependencies:**
  - Step 1: message/meta structure analysis

**Acceptance Criteria:**
  - Function extracts C:\... format paths
  - Function handles edge cases (empty, malformed paths)
  - Function returns normalized Windows path format

### Step 3: Design and implement repo URL extraction function

**Files:** `src/utils/pathExtractor.ts`

**Dependencies:**
  - Step 1: message/meta structure analysis

**Acceptance Criteria:**
  - Function extracts GitHub/GitLab/Bitbucket URLs
  - Function validates URL format
  - Function returns normalized URL with protocol

### Step 4: Integrate extraction functions into logEventNormalizer

**Files:** `src/utils/logEventNormalizer.ts`

**Dependencies:**
  - Step 2: Windows path extraction
  - Step 3: Repo URL extraction

**Acceptance Criteria:**
  - Normalizer calls extraction functions
  - Paths stored in consistent format in normalized output
  - Privacy controls applied (redaction if needed)

### Step 5: Add unit tests for path and URL extraction

**Files:** `src/utils/pathExtractor.ts`, `src/utils/hash.test.ts`

**Dependencies:**
  - Step 2: Windows path extraction
  - Step 3: Repo URL extraction

**Acceptance Criteria:**
  - Test Windows path extraction with valid/invalid inputs
  - Test repo URL extraction with various providers
  - Test edge cases (empty strings, malformed data)

### Step 6: Update TypeScript types to reflect new path/URL fields

**Files:** `src/types/logEvent.ts`, `src/types/index.ts`

**Dependencies:**
  - Step 4: Integration into normalizer

**Acceptance Criteria:**
  - Types include normalized paths field
  - Types include normalized URLs field
  - Types are exported consistently

## Risks

1. Message/meta structure may vary across different event types
2. Privacy controls may require additional redaction logic
3. URL normalization may need to handle multiple hosting platforms

## Open Questions

1. What specific privacy controls are required for path/URL storage?
2. Are there existing URL parsing utilities in the codebase?
3. What is the expected volume of path/URL data per event?

