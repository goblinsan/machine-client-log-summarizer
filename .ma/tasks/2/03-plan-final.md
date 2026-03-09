# Plan Iteration 2

Generated: 2026-03-09T14:50:15.434Z

## Implementation Plan

### Step 1: Verify existing prompt files in src/config/prompts/ directory and assess completeness against task requirements

**Files:** `src/config/prompts/context.md`, `src/config/prompts/coordinator.md`, `src/config/prompts/lead-engineer.md`, `src/config/prompts/qa.md`, `src/config/prompts/security.md`

### Step 2: Update context.md to include clear scope boundaries and safety limits for model behavior

**Files:** `src/config/prompts/context.md`

### Step 3: Update coordinator.md with escalation rules and coordination scope definitions

**Files:** `src/config/prompts/coordinator.md`

### Step 4: Update lead-engineer.md with technical scope and escalation pathways for engineering decisions

**Files:** `src/config/prompts/lead-engineer.md`

### Step 5: Update qa.md with testing scope, bug triage escalation rules, and quality safety limits

**Files:** `src/config/prompts/qa.md`

### Step 6: Update security.md with security review scope, incident escalation rules, and safety limits for security tasks

**Files:** `src/config/prompts/security.md`

### Step 7: Run smoke tests to verify prompt files are properly integrated and accessible

**Files:** `src/__tests__/smoke.test.ts`

## Risks

1. Existing prompt files may already meet requirements - verify before making changes
2. Prompt content may need to align with existing codebase patterns and conventions
3. Escalation rules may need to match actual team structure and tooling

## Open Questions

1. What is the current escalation hierarchy for this repository?
2. Are there existing safety limits or guardrails already defined elsewhere?
3. What specific scope boundaries should each persona respect?

