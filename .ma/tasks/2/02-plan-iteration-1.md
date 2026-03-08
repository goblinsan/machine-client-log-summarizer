# Plan Iteration 1

Generated: 2026-03-08T22:24:38.253Z

## Implementation Plan

### Step 1: Review existing prompt files in src/config/prompts/ to assess current content and identify gaps in scope, escalation rules, and safety limits

**Files:** `src/config/prompts/context.md`, `src/config/prompts/coordinator.md`, `src/config/prompts/lead-engineer.md`, `src/config/prompts/qa.md`, `src/config/prompts/security.md`

**Dependencies:**
  - Repository context scan completed

**Acceptance Criteria:**
  - All 5 persona files exist in src/config/prompts/
  - Each file contains clear scope definition
  - Each file contains escalation rules section
  - Each file contains safety limits section

### Step 2: Update context.md with scope definition for model context awareness and safety limits for context injection

**Files:** `src/config/prompts/context.md`

**Dependencies:**
  - Step 1: Review existing content

**Acceptance Criteria:**
  - File contains scope section defining context boundaries
  - File contains safety limits for context data handling
  - File remains under 2KB to maintain performance

### Step 3: Update coordinator.md with scope for orchestration tasks, escalation rules for task delegation, and safety limits for coordinator actions

**Files:** `src/config/prompts/coordinator.md`

**Dependencies:**
  - Step 1: Review existing content

**Acceptance Criteria:**
  - File contains scope section for coordinator responsibilities
  - File contains escalation rules for task delegation
  - File contains safety limits for coordinator actions

### Step 4: Update lead-engineer.md with scope for engineering decisions, escalation rules for technical blockers, and safety limits for code generation

**Files:** `src/config/prompts/lead-engineer.md`

**Dependencies:**
  - Step 1: Review existing content

**Acceptance Criteria:**
  - File contains scope section for engineering responsibilities
  - File contains escalation rules for technical issues
  - File contains safety limits for code generation and review

### Step 5: Update qa.md with scope for quality assurance tasks, escalation rules for defect severity, and safety limits for test execution

**Files:** `src/config/prompts/qa.md`

**Dependencies:**
  - Step 1: Review existing content

**Acceptance Criteria:**
  - File contains scope section for QA responsibilities
  - File contains escalation rules for defect handling
  - File contains safety limits for test execution and reporting

### Step 6: Update security.md with scope for security review tasks, escalation rules for vulnerability severity, and safety limits for security-sensitive operations

**Files:** `src/config/prompts/security.md`

**Dependencies:**
  - Step 1: Review existing content

**Acceptance Criteria:**
  - File contains scope section for security responsibilities
  - File contains escalation rules for vulnerability handling
  - File contains safety limits for security-sensitive operations

### Step 7: Verify all prompt files are properly formatted and accessible from src/config/prompts/ directory

**Files:** `src/config/prompts/context.md`, `src/config/prompts/coordinator.md`, `src/config/prompts/lead-engineer.md`, `src/config/prompts/qa.md`, `src/config/prompts/security.md`

**Dependencies:**
  - Steps 2-6 completed

**Acceptance Criteria:**
  - All files are valid markdown
  - All files are accessible from repository root
  - No syntax errors in markdown files

## Risks

1. Existing prompt files may already contain sufficient content requiring minimal updates
2. Scope definitions may conflict with existing repository patterns in src/config/index.ts

## Open Questions

1. What specific escalation thresholds should be defined for each persona?
2. Are there existing safety limit patterns in src/config/index.ts that should be referenced?

