# Plan Iteration 2

Generated: 2026-03-08T07:17:46.248Z

## Implementation Plan

### Step 1: Create JSON schema definition for configuration validation

**Files:** `src/config/schema.ts`

**Dependencies:**

**Acceptance Criteria:**
  - Schema defines all config keys: logPath, store, lmStudioEndpoint, and any future keys
  - Schema includes type definitions, required fields, and default values
  - File uses TypeScript with proper JSDoc comments for schema properties

### Step 2: Create default configuration values module

**Files:** `src/config/defaults.ts`

**Dependencies:**
  - src/config/schema.ts

**Acceptance Criteria:**
  - Defines default values for logPath, store, lmStudioEndpoint
  - Defaults are exported as const objects for immutability
  - File includes comments explaining each default's purpose

### Step 3: Create hierarchical config loader combining env, file, and CLI sources

**Files:** `src/config/index.ts`

**Dependencies:**
  - src/config/schema.ts
  - src/config/defaults.ts

**Acceptance Criteria:**
  - Loader reads .env file using dotenv or similar
  - Loader parses command-line arguments for CLI overrides
  - Loader applies hierarchy: CLI > file > env > defaults
  - Loader validates config against JSON schema before export
  - Exports validated config object with type safety

### Step 4: Create .env.example file with documented configuration options

**Files:** `.env.example`

**Dependencies:**
  - src/config/defaults.ts

**Acceptance Criteria:**
  - File lists all configurable environment variables
  - Each variable includes description and example value
  - File uses standard .env.example naming convention
  - File is placed at repository root

### Step 5: Update package.json with required dependencies

**Files:** `package.json`

**Dependencies:**

**Acceptance Criteria:**
  - Add dotenv dependency for env file parsing
  - Add zod or ajv for JSON schema validation
  - Dependencies listed in devDependencies or dependencies appropriately
  - No breaking changes to existing package structure

### Step 6: Add TypeScript declarations for config module exports

**Files:** `src/config/index.ts`

**Dependencies:**
  - src/config/schema.ts
  - src/config/defaults.ts

**Acceptance Criteria:**
  - Config interface exported with proper type definitions
  - TypeScript compiles without errors
  - IDE autocomplete works for config exports

## Risks

1. JSON schema validation library choice (zod vs ajv) may affect bundle size
2. CLI argument parsing may conflict with existing CLI patterns in repo
3. SCSS files may need updates if config affects styling paths

## Open Questions

1. Should config be exported as singleton or function returning fresh instance?
2. What error handling strategy for invalid schema validation?
3. Should .env.example be committed or kept as template?

## Notes

1. Prioritize TypeScript type safety throughout config module
2. Keep config module independent of Vite build configuration
3. Ensure defaults are clearly separated from environment overrides
4. Consider adding config versioning for future schema changes

