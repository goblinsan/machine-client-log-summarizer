# Plan Iteration 1

Generated: 2026-03-08T21:16:58.660Z

## Implementation Plan

### Step 1: Define JSON schema for configuration with required fields for log paths, store, and LM Studio endpoint

**Files:** `src/config/schema.ts`

**Dependencies:**

**Acceptance Criteria:**
  - schema.ts exports a valid JSON Schema object
  - Schema includes fields: logPath, store, lmStudioEndpoint
  - Schema has required field validation enabled

### Step 2: Implement default configuration values for all config fields

**Files:** `src/config/defaults.ts`

**Dependencies:**
  - schema.ts updated with field definitions

**Acceptance Criteria:**
  - defaults.ts exports default values for all schema fields
  - Defaults include sensible paths for logs directory
  - Defaults include store configuration (e.g., 'memory' or 'sqlite')
  - Defaults include LM Studio endpoint placeholder (e.g., 'http://localhost:1234/v1')
  - File exports named exports and default export for compatibility

### Step 3: Implement hierarchical config loader (CLI > file > env > defaults)

**Files:** `src/config/index.ts`

**Dependencies:**
  - schema.ts with validation rules
  - defaults.ts with default values

**Acceptance Criteria:**
  - Config loader reads CLI arguments first
  - Config loader reads .env file second (if exists)
  - Config loader reads config file third (if exists)
  - Config loader falls back to defaults.ts fourth
  - Schema validation runs after all sources merged
  - Validation errors throw descriptive errors with field names
  - Exports merged config object and validation errors

### Step 4: Create .env.example file with documented configuration options

**Files:** `.env.example`

**Dependencies:**
  - schema.ts field definitions
  - defaults.ts default values

**Acceptance Criteria:**
  - .env.example exists at repository root
  - File includes all configurable fields from schema
  - Each field has comment explaining purpose and example value
  - File uses .env.example extension (not .env to avoid accidental commit)
  - File is readable and follows standard .env format

### Step 5: Add config loading tests to verify hierarchical merging and validation

**Files:** `src/__tests__/config.test.ts`

**Dependencies:**
  - index.ts config loader implementation
  - schema.ts validation implementation
  - defaults.ts defaults implementation

**Acceptance Criteria:**
  - Tests verify CLI args override file config
  - Tests verify file config overrides env
  - Tests verify env overrides defaults
  - Tests verify schema validation catches invalid values
  - Tests verify validation errors include field names
  - Tests use Vitest test runner with existing test setup

## Risks

1. Existing src/config/index.ts is 18.7KB - may need significant refactoring to support new loader pattern
2. CLI argument parsing requires additional dependencies (e.g., yargs, commander, or simple process.argv parsing)
3. Schema validation library choice impacts bundle size and compatibility
4. Existing tests in src/__tests__/ may need updates to reflect new config structure

## Open Questions

1. Which CLI argument parsing library to use (yargs, commander, or minimal process.argv)?
2. Should config file be JSON or TypeScript (.ts)?
3. What store backend to default to (memory, sqlite, redis)?
4. Should validation errors be thrown or returned as object?

## Notes

1. Prioritize minimal dependencies - prefer built-in Node.js modules where possible
2. Maintain backward compatibility with existing config usage in App.tsx/main.tsx
3. Keep config loading in src/config/ directory to maintain separation of concerns
4. Ensure all config values are typed with TypeScript interfaces matching schema

