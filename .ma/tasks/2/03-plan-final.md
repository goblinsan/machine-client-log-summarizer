# Plan Iteration 1

Generated: 2026-03-08T08:06:50.060Z

## Implementation Plan

### Step 1: Create src/config/prompts/ directory for persona prompt files

**Files:** `src/config/prompts/`

**Dependencies:**
  - src/config/defaults.ts
  - src/config/schema.ts

### Step 2: Create coordinator.md prompt file with scope, escalation rules, and safety limits

**Files:** `src/config/prompts/coordinator.md`

**Dependencies:**
  - src/config/prompts/

### Step 3: Create context.md prompt file for context-aware model behavior

**Files:** `src/config/prompts/context.md`

**Dependencies:**
  - src/config/prompts/coordinator.md

### Step 4: Create lead-engineer.md prompt file for engineering decisions

**Files:** `src/config/prompts/lead-engineer.md`

**Dependencies:**
  - src/config/prompts/context.md

### Step 5: Create qa.md prompt file for quality assurance guidance

**Files:** `src/config/prompts/qa.md`

**Dependencies:**
  - src/config/prompts/lead-engineer.md

### Step 6: Create security.md prompt file for security guardrails

**Files:** `src/config/prompts/security.md`

**Dependencies:**
  - src/config/prompts/lead-engineer.md

### Step 7: Update src/config/index.ts to export prompt file paths

**Files:** `src/config/index.ts`

**Dependencies:**
  - src/config/prompts/

### Step 8: Verify all prompt files use allowed extensions and are in repository root

**Files:** `src/config/prompts/*.md`

**Dependencies:**
  - src/config/prompts/coordinator.md
  - src/config/prompts/context.md
  - src/config/prompts/lead-engineer.md
  - src/config/prompts/qa.md
  - src/config/prompts/security.md

## Risks

1. Prompt files may need to reference external context that isn't in the repo
2. Escalation rules may need coordination with external stakeholders

## Open Questions

1. Should prompt files be in src/config/prompts/ or at repo root?
2. What specific escalation thresholds should be defined for each persona?

