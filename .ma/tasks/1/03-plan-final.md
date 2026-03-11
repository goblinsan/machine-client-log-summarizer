# Plan Iteration 1

Generated: 2026-03-11T02:10:18.735Z

## Implementation Plan

### Step 1: Review existing config module structure and dependencies

**Files:** `src/config/defaults.ts`, `src/config/schema.ts`, `src/config/index.ts`, `package.json`

**Dependencies:**

**Acceptance Criteria:**
  - Understand current defaults structure
  - Identify existing schema validation approach
  - Confirm package.json has required dependencies (zod, dotenv, commander, etc.)

### Step 2: Define JSON schema for config with log paths, store, and LM Studio endpoint

**Files:** `src/config/schema.ts`

**Dependencies:**
  - Step 1

**Acceptance Criteria:**
  - Schema includes logPaths configuration
  - Schema includes store configuration
  - Schema includes lmStudioEndpoint configuration
  - Schema uses Zod or similar validation library

### Step 3: Implement hierarchical config loader (CLI > file > env > defaults)

**Files:** `src/config/index.ts`, `src/config/loader.ts`

**Dependencies:**
  - Step 2

**Acceptance Criteria:**
  - CLI arguments take precedence over file config
  - File config takes precedence over env variables
  - Env variables take precedence over defaults
  - Loader validates against schema before merging
  - Returns merged config object

### Step 4: Create .env.example with documented defaults

**Files:** `.env.example`

**Dependencies:**
  - Step 3

**Acceptance Criteria:**
  - Contains LOG_PATHS variable
  - Contains STORE variable
  - Contains LM_STUDIO_ENDPOINT variable
  - Includes comments explaining each variable
  - File is at repository root

### Step 5: Add CLI argument parsing for config options

**Files:** `src/config/cli.ts`, `package.json`

**Dependencies:**
  - Step 3

**Acceptance Criteria:**
  - CLI accepts --log-path, --store, --lm-studio-endpoint flags
  - CLI arguments passed to config loader
  - Help text available via --help flag
  - Dependencies added to package.json if needed

### Step 6: Write unit tests for config loader and validation

**Files:** `src/__tests__/config.test.ts`, `src/__tests__/config-loader.test.ts`

**Dependencies:**
  - Step 3
  - Step 4
  - Step 5

**Acceptance Criteria:**
  - Tests cover default config merging
  - Tests cover env variable precedence
  - Tests cover file config precedence
  - Tests cover CLI argument precedence
  - Tests cover schema validation errors
  - Tests pass with Vitest

### Step 7: Update main application to use new config loader

**Files:** `src/App.tsx`, `src/main.tsx`

**Dependencies:**
  - Step 3
  - Step 5

**Acceptance Criteria:**
  - App imports config from loader
  - App uses validated config values
  - No hardcoded config values remain

## Risks

1. Missing dependencies in package.json (zod, dotenv, commander) may require npm install
2. Existing config files may conflict with new loader design
3. Schema validation errors may break existing functionality if not handled gracefully

## Open Questions

1. Which validation library to use (zod, yup, ajv)?
2. Should config file be JSON or TOML?
3. What file extension for config (config.json, config.yaml)?
4. Should CLI support short flags (-p) or long flags (--path)?

## Notes

1. Prefer src/config/loader.ts as new file rather than modifying existing index.ts
2. Keep .env.example at repository root as specified
3. Use TypeScript for all config-related files
4. Ensure all config values are typed with proper interfaces
5. Add JSDoc comments to loader functions for documentation

