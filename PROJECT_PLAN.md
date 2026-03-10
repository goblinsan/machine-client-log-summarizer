# Multi-Agent Log Summarizer Project Plan

## Overview

### Security Documentation
The project maintains comprehensive security guidelines in `SECURITY_GUIDELINES.md` covering:

- **Input Validation**: All external inputs are validated against schemas before processing
- **Dependency Management**: Dependencies are pinned and audited regularly using `npm audit`
- **Environment Security**: Sensitive data is stored in environment variables, never committed
- **Code Review**: All PRs undergo security review for sensitive data exposure and proper error handling
- **Logging**: Security events are logged appropriately without exposing PII or credentials
- **Type Safety**: TypeScript strict mode is enforced to prevent runtime type errors
- **Testing**: Security-focused tests are included in the test suite

See [SECURITY_GUIDELINES.md](./SECURITY_GUIDELINES.md) for detailed security standards and guidelines.

### New Test Files Created

### New Test Files Created
- `src/__tests__/regression-gap.test.ts`: Regression tests for reported gap
- `src/__tests__/qa-notes.md`: Verification steps documentation

### Verification Steps

### Security Standards
The project adheres to the following security standards:

- **Dependency Management**: All dependencies are pinned in `package-lock.json` to prevent supply chain attacks.
- **Code Review**: All code changes must pass security review before merging.
- **Documentation**: Security guidelines are documented in `SECURITY_GUIDELINES.md`.

See [SECURITY_GUIDELINES.md](./SECURITY_GUIDELINES.md) for detailed security standards and guidelines.

## Architecture

## Project Structure

- Verification steps documented in QA notes

### Validation Plan
- Run `vitest run` command to execute all tests
- Verify newly created test file passes without errors

### Key Files
- `src/__tests__/regression-gap.test.ts`
- `src/__tests__/qa-notes.md`

### Source Hypothesis
The code review failed because the repository lacks regression tests for the reported gap, and there are no verification steps documented in QA notes.

### Generated for parent task #110

## Existing Test Files
- `src/__tests__/synthetic-logs-data.test.ts`
- `src/__tests__/synthetic-logs.test.ts`
- `src/__tests__/config.test.ts`
- `src/__tests__/smoke.test.ts`

## Test Configuration
- Vitest test runner
- TypeScript compiler
- Node.js dependencies

## Repository Context
- Primary Language: TypeScript
- Other Languages: JavaScript
- Tooling & Frameworks: Node.js, TypeScript, Vitest

## Local Environment Setup
- `npm install --no-package-lock`

## Statistics
- Total Files: 42
- Total Size: 199.82 KB
- Max Depth: 10

## Directory Structure
```
./
  .env.example (0.6KB)
  .gitignore (0.2KB)
  .stylelintrc.json (0.5KB)
  PROJECT_PLAN.md (10.5KB)
  README.md (1.3KB)
  index.html (0.3KB)
  package-lock.json (123.0KB)
  package.json (0.9KB)
  tsconfig.json (0.4KB)
  vite.config.ts (0.2KB)
  vitest.config.ts (0.6KB)
scripts/
  replace-colors.js (4.4KB)
src/
  App.tsx (1.9KB)
  main.tsx (0.2KB)
src/__tests__/
  config.test.ts (1.9KB)
  smoke.test.ts (0.5KB)
  synthetic-logs-data.test.ts (1.4KB)
  synthetic-logs.test.ts (2.0KB)
  qa-notes.md (NEW)
  regression-gap.test.ts (NEW)
src/config/
  defaults.ts (0.3KB)
  index.ts (18.7KB)
  schema.ts (1.8KB)
  synthetic-logs-data.ts (1.1KB)
  synthetic-logs.ts (3.8KB)
src/config/prompts/
  context.md (1.2KB)
  coordinator.md (1.5KB)
  lead-engineer.md (1.3KB)
  qa.md (1.2KB)
  security.md (1.2KB)
src/styles/
  _base.scss (1.7KB)
  _components.scss (3.3KB)
  _extras.scss (0.7KB)
  _index.scss (0.2KB)
  _layout.scss (1.0KB)
  _migrated.scss (3.4KB)
  _mixins.scss (0.2KB)
  _utils.scss (0.4KB)
  main.scss (0.3KB)
src/test/
  setup.ts (0.1KB)
src/types/
  index.ts (0.0KB)
  logEvent.ts (1.2KB)
src/utils/
  index.ts (0.1KB)
  logEventNormalizer.ts (4.5KB)
```

## Large Files
- `package-lock.json` (123.0KB, 3711 lines)
- `src/config/index.ts` (18.7KB, 644 lines)

## File Types
- .ts: 16 files
- .scss: 9 files
- .md: 7 files
- .json: 4 files
- .tsx: 2 files
- .example: 1 file
- (no extension): 1 file
- .html: 1 file
- .js: 1 file

## Dashboard Context
### Current Task

Summary:
Create regression tests for the reported gap and document verification steps in QA notes to resolve review findings.

Remediation Steps:
1. 1. Create a new test file under src/__tests__/ to cover the reported gap.
2. 2. Implement necessary tests for the reported gap within the newly created test file.
3. 3. Document verification steps in QA notes.

Acceptance Criteria:
- The newly created test file covers the reported gap and passes without errors.
- Verification steps are documented in QA notes.

Validation Plan:
- Run `vitest run` command to execute all tests, including the newly created one.
- Verify that the newly created test file passes without errors.

Key Files: 
- `src/__tests__/synthetic-logs-data.test.ts`
- `README.md`

Source Hypothesis (confidence: high): The code review failed because the repository lacks regression tests for the reported gap, and there are no verification steps documented in QA notes.

Generated for parent task #110

### New Test Files Created
- `src/__tests__/regression-gap.test.ts`: Regression tests for reported gap
- `src/__tests__/qa-notes.md`: Verification steps documentation

### Verification Steps
1. Run `vitest run` to execute all tests
2. Verify new test file passes without errors
3. Confirm QA notes are updated with verification steps

### Acceptance Criteria
- New test file covers reported gap and passes without errors
- Verification steps documented in QA notes

### Validation Plan
- Run `vitest run` command to execute all tests
- Verify newly created test file passes without errors

### Key Files
- `src/__tests__/regression-gap.test.ts`
- `src/__tests__/qa-notes.md`

### Source Hypothesis
The code review failed because the repository lacks regression tests for the reported gap, and there are no verification steps documented in QA notes.

### Generated for parent task #110

## Existing Test Files
- `src/__tests__/synthetic-logs-data.test.ts`
- `src/__tests__/synthetic-logs.test.ts`
- `src/__tests__/config.test.ts`
- `src/__tests__/smoke.test.ts`

## Test Configuration
- Vitest test runner
- TypeScript compiler
- Node.js dependencies

## Repository Context
- Primary Language: TypeScript
- Other Languages: JavaScript
- Tooling & Frameworks: Node.js, TypeScript, Vitest

## Local Environment Setup
- `npm install --no-package-lock`

## Statistics
- Total Files: 42
- Total Size: 199.82 KB
- Max Depth: 10

## Directory Structure


Overview
--------
This project is a local dashboard (Vite + React + TypeScript) that ingests JSON log records produced by coordinated machine agents, stores them locally, and uses a locally hosted model (LM Studio) to produce human-friendly summaries for a selectable time window. The UI shows a list of JSON entries as collapsible/expandable items and displays model-generated summaries alongside the raw logs.

Current state (short)
----------------------
- Vite + React + TypeScript scaffold is in place and running on port 6006.
- Styles implemented in SCSS partials using a SMACSS-like split: `_base.scss`, `_layout.scss`, `_components.scss`, `_utils.scss`, `_mixins.scss`, and a manifest `_index.scss`.
- A Node script `scripts/replace-colors.js` exists to centralize color tokens; stylelint is configured and passing for the current SCSS.
- Basic UI skeleton and components exist; some files (App, main) already import the SCSS entrypoint.

Goal / Scope for this plan
-------------------------
Evolve the dashboard to:
- Continuously ingest JSON log files from disk and optional local process streams.
- Store logs in a local in-memory store (with an optional persisted layer) and present them as an expandable list in the UI.
- Integrate with a local LM Studio endpoint to summarize log history for an arbitrary time window.
- Provide a settings panel to configure LM Studio endpoint, time-window defaults, and ingestion options.
- Drive development with TDD: every new feature is introduced as a failing test then implemented to pass.

Milestones (high level)
-----------------------
1. Project & test harness setup
2. Local log ingestion (file + optional stream)
3. Log store, list UI, and expandable/collapsible entries
4. LM Studio integration (local model API client)
5. Summarization engine and time-window queries
6. Settings UI, error handling, and UX polish
7. End-to-end tests, CI, and documentation

For each milestone below you'll find a TDD task breakdown: the first task is always "write a failing test" and the second is "implement production code to make the test pass". Where helpful I include small subsequent tests (edge cases).

Milestone 1 — Project & test harness setup
-----------------------------------------
Goal: Ensure a reproducible dev environment and a test runner for unit and integration tests.

Tasks (TDD)
- Task 1 (test): Add a failing test that asserts the test runner is wired and the project builds in test mode.
	- Example: create `tests/setup.test.ts` that imports the app entry and asserts a non-null App component or that `npm run build` returns success (mocked). Run the test and observe failure (test should fail until test scripts are added).
- Task 2 (implementation): Configure the test runner (Jest or Vitest), add a minimal test script in package.json, and implement any bootstrapping so that `tests/setup.test.ts` passes.
	- Ensure types and tsconfig are compatible with the test runner.

Acceptance criteria
- Tests can be executed via `npm test` (or `npm run test:unit`) and the setup test passes.
- CI job skeleton exists (optional at this stage).

Milestone 2 — Local log ingestion (file + optional stream)
--------------------------------------------------------
Goal: Implement a robust ingestion layer that can read JSON log files from disk and accept an optional local process stream interface.

Tasks (TDD)
- Task 1 (test): Write a failing unit test that verifies the ingestion API can read a single JSON file and returns a parsed object.
	- Example: `tests/ingest/file-ingest.test.ts` should create a temporary JSON file with a sample log entry, call the ingestion function and assert the returned entry matches expected structure.
- Task 2 (implementation): Implement `src/ingest/fileIngest.ts` to read JSON files (support newline-delimited JSON and arrays), parse them into normalized records, and return them.
	- Edge test: another failing test to assert malformed JSON causes a controlled error (and the implementation should return a typed error or skip record policy).

Acceptance criteria
- File ingestion tests pass and ingestion handles NDJSON and JSON arrays.
- Ingestion API exposes a small interface so the app can request imports from a file picker.

Milestone 3 — Log store, list UI, and expandable entries
-------------------------------------------------------
Goal: Create a local log store and a UI list component that displays JSON entries as expandable/collapsible items (with virtualized list for performance as needed).

Tasks (TDD)
- Task 1 (test): Add a failing unit test for the store that asserts adding new records updates the store and emits change events.
	- Example: `tests/store/store.test.ts` creates the store, subscribes to updates, pushes a sample record and expects the subscription to receive the new length and entry.
- Task 2 (implementation): Implement `src/store/logStore.ts` (simple event-emitter-based store or use Zustand) to manage records, indexing by timestamp, and queries by time window.
- Task 3 (test): Add a failing UI test (Vitest + testing-library) asserting that the `LogList` component renders a collapsed entry by default and expands when clicked to show pretty-printed JSON.
- Task 4 (implementation): Implement `src/components/LogList.tsx` and `LogItem.tsx` to render the list, toggle expand/collapse, and pretty-print JSON (use monaco or `<pre>` with formatting). Implement optional virtualization if necessary.

Acceptance criteria
- The store tests pass; UI tests assert expand/collapse behavior.
- In the running app the log list displays items that expand to show formatted JSON.

Milestone 4 — LM Studio integration (local model client)
-----------------------------------------------------
Goal: Provide a small API client to call a local LM Studio instance to send prompts and receive completions.

Tasks (TDD)
- Task 1 (test): Add a failing integration test that mocks an LM Studio endpoint and asserts the client library calls the expected HTTP route and returns a structured response.
	- Example: `tests/lm/client.test.ts` sets up an HTTP mock server (msw or nock) and expects `lmClient.summarizeWindow()` to POST the right payload.
- Task 2 (implementation): Implement `src/lm/lmClient.ts` that can POST to a configurable LM Studio URL, handle authentication (if needed), and parse returned completions into a typed Summaries object.
	- Edge test: ensure HTTP errors are surfaced as typed errors and do not crash the app.

Acceptance criteria
- The LM client unit/integration tests pass; the client supports configurable base URL and basic timeouts/retries.

Milestone 5 — Summarization engine and time-window queries
---------------------------------------------------------
Goal: Build the summarization flow: query the store for a time window, format a prompt, send to LM Studio, and persist/display the returned summary.

Tasks (TDD)
- Task 1 (test): Add a failing test that asserts the summarizer composes the expected prompt given a set of records and a time window.
	- Example: `tests/summarize/prompt.test.ts` constructs 3 sample records and compares the generated prompt to a known-good string (this ensures stable prompt shaping).
- Task 2 (implementation): Implement `src/summarize/engine.ts` that queries `logStore` for records, builds the prompt (with truncation heuristics), calls `lmClient.summarizeWindow()`, and returns/stores structured summaries.
- Task 3 (test): Failing integration test to assert the end-to-end path: store -> summarizer -> lmClient (mocked) -> UI receives summary updates.
- Task 4 (implementation): Wire summarizer into the UI with progress indicators and caching (per time window), plus retry/backoff on transient LM errors.

Acceptance criteria
- Prompt shaping tests pass; summarizer returns cached summaries for identical time windows and invalidates cache when the underlying store changes.

Milestone 6 — Settings UI, error handling, and UX polish
------------------------------------------------------
Goal: Expose LM Studio endpoint, time-window defaults, ingestion behavior, and show unobtrusive errors and logs in the UI.

Tasks (TDD)
- Task 1 (test): Add a failing UI test that asserts settings are persisted to localStorage and that changing the LM Studio URL updates the client configuration.
- Task 2 (implementation): Implement `src/components/Settings.tsx` with a small form, localStorage persistence, and validation.
- Task 3 (test): Add failing tests for graceful error displays (summarization failures, ingestion parse errors).
- Task 4 (implementation): Implement consistent error handling and user-notifications (toasts/snackbars) and a small diagnostic panel.

Acceptance criteria
- Settings persist across reloads; errors are surfaced to the user with actionable messages.

Milestone 7 — End-to-end tests, CI, and documentation
----------------------------------------------------
Goal: Add E2E tests that run against a mocked LM Studio and create a CI pipeline to run unit + e2e checks. Document the SCSS manifest and the developer workflow for adding mixins/partials.

Tasks (TDD)
- Task 1 (test): Create an E2E test (Playwright or Cypress) that starts the dev server, uploads or writes a log file, triggers summarization (mocked LM Studio), and verifies the summary appears in the UI.
- Task 2 (implementation): Wire CI (GitHub Actions) with jobs for install, lint, unit tests, and E2E tests (using mocked endpoints or service containers). Add README / `DEVELOPER.md` notes on the SCSS manifest and how to add new mixins/partials.

Acceptance criteria
- CI runs: install -> lint -> unit tests -> e2e (mocked) and passes on the branch.
- Developer documentation added describing the SCSS organization and the summarization flow.

Acceptance Criteria (overall)
----------------------------
- All milestones have unit tests (and integration tests where applicable) driven by the failing-first TDD pattern.
- The app can ingest JSON logs from disk, show them in an expandable list, and obtain summaries from a configurable LM Studio endpoint for an arbitrary time window.
- Settings persist and are validated; errors are handled gracefully.
- A CI pipeline runs linting, unit tests, and a basic mocked E2E flow.

Notes
-----
- Start small: get file ingestion + store + a simple summarizer prompt working end-to-end with a mocked LM Studio before integrating the live LM Studio host.
- Maintain the TDD discipline: each feature begins with a small failing test that expresses the expectation and is quick to run.
- Keep the `_extras.scss` partial minimal — migrate rules into primary partials as components stabilize.





