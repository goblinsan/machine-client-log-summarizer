# Plan Iteration 2

Generated: 2026-03-12T22:02:53.746Z

## Implementation Plan

### Step 1: Analyze existing path extraction utilities to understand current implementation and identify gaps for Windows path and repo URL extraction

**Files:** `src/utils/pathExtractor.ts`, `src/utils/index.ts`, `src/types/index.ts`

**Dependencies:**
  - Review existing pathExtractor.ts implementation
  - Check types/index.ts for existing path-related types

**Acceptance Criteria:**
  - Understand current path extraction logic
  - Identify what needs to be added for Windows paths and repo URLs

### Step 2: Design and implement Windows file path extraction logic (C:\... format detection and normalization)

**Files:** `src/utils/pathExtractor.ts`

**Dependencies:**
  - Step 1: Existing path extraction analysis

**Acceptance Criteria:**
  - Windows paths detected correctly
  - Paths normalized to consistent format
  - No false positives on non-path strings

### Step 3: Design and implement repo URL extraction logic (GitHub/GitLab/etc. URL detection)

**Files:** `src/utils/pathExtractor.ts`

**Dependencies:**
  - Step 2: Windows path extraction implementation

**Acceptance Criteria:**
  - Repo URLs detected from message/meta
  - URLs normalized to consistent format
  - Valid URLs only (no malformed URLs)

### Step 4: Create path storage structure for deep linking and privacy controls

**Files:** `src/types/index.ts`, `src/utils/pathExtractor.ts`

**Dependencies:**
  - Step 3: Windows path extraction
  - Step 4: Repo URL extraction

**Acceptance Criteria:**
  - Paths stored in consistent structure
  - Privacy controls implemented (redaction if needed)
  - Deep linking format standardized

### Step 5: Add unit tests for path extraction and normalization logic

**Files:** `src/utils/pathExtractor.test.ts`

**Dependencies:**
  - Step 4: Path storage structure

**Acceptance Criteria:**
  - Windows paths tested with various formats
  - Repo URLs tested with various platforms
  - Edge cases covered (malformed inputs)

### Step 6: Update utility index exports to include new path extraction functions

**Files:** `src/utils/index.ts`

**Dependencies:**
  - Step 5: Unit tests

**Acceptance Criteria:**
  - New functions exported from utils
  - Type definitions updated
  - No breaking changes to existing exports

## Risks

1. Windows path format variations (C:/ vs C:\) may need special handling
2. Repo URL detection may conflict with regular URLs in messages
3. Privacy controls may require additional review for data handling

## Open Questions

1. What specific repo URL formats need to be supported (GitHub, GitLab, Bitbucket, etc.)?
2. What privacy redaction rules apply to stored paths?
3. Should path extraction happen at ingestion or at query time?

