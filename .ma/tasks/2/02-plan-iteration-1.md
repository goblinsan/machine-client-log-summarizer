# Plan Iteration 1

Generated: 2026-03-09T14:48:29.863Z

## Implementation Plan

### Step 1: Review existing persona prompt files to assess current content and identify gaps in scope, escalation rules, and safety limits

**Files:** `src/config/prompts/coordinator.md`, `src/config/prompts/context.md`, `src/config/prompts/lead-engineer.md`, `src/config/prompts/qa.md`, `src/config/prompts/security.md`

**Dependencies:**

### Step 2: Update coordinator.md with scope definition, escalation rules, and safety limits for model behavior

**Files:** `src/config/prompts/coordinator.md`

**Dependencies:**
  - Review existing coordinator.md content

### Step 3: Update context.md with persona context injection guidelines and safety boundaries

**Files:** `src/config/prompts/context.md`

**Dependencies:**
  - Review existing context.md content

### Step 4: Update lead-engineer.md with technical scope, code review escalation rules, and safety limits

**Files:** `src/config/prompts/lead-engineer.md`

**Dependencies:**
  - Review existing lead-engineer.md content

### Step 5: Update qa.md with testing scope, bug triage escalation rules, and safety limits

**Files:** `src/config/prompts/qa.md`

**Dependencies:**
  - Review existing qa.md content

### Step 6: Update security.md with security review scope, vulnerability escalation rules, and safety limits

**Files:** `src/config/prompts/security.md`

**Dependencies:**
  - Review existing security.md content

### Step 7: Create schema or configuration file to manage prompt file versions and activation rules

**Files:** `src/config/prompts/index.ts`

**Dependencies:**
  - Complete all persona prompt updates

## Risks

1. Existing prompt files may have undocumented assumptions about model behavior that need to be surfaced
2. Escalation rules may need to reference external systems not present in the repository
3. Safety limits must be tested against actual model outputs to verify effectiveness

## Open Questions

1. What external systems or APIs should escalation rules reference?
2. Are there existing safety policies or compliance requirements to incorporate?
3. What model provider or framework is being used for these prompts?

