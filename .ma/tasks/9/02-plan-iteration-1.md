# Plan Iteration 1

Generated: 2026-03-14T22:50:00.770Z

## Implementation Plan

### Step 1: Extend config schema to support retention policies (size/time-based) and compaction settings

**Files:** `src/config/schema.ts`

**Dependencies:**

**Acceptance Criteria:**
  - Schema includes retentionConfig interface with maxSizeMB, maxAgeHours fields
  - Compaction config included with enabled flag and schedule interval
  - TypeScript types exported from schema.ts

### Step 2: Implement batched write queue with configurable batch size and flush triggers

**Files:** `src/utils/batch-writer.ts`

**Dependencies:**

**Acceptance Criteria:**
  - BatchWriter class accepts config for batchSize, maxWaitMs
  - write() method queues events until batch size or timeout trigger flush
  - Flush returns Promise with latency metrics

### Step 3: Implement retention policy enforcement logic (size and time-based)

**Files:** `src/utils/retention-enforcer.ts`

**Dependencies:**

**Acceptance Criteria:**
  - RetentionEnforcer class checks total size against maxSizeMB limit
  - Removes events older than maxAgeHours threshold
  - Returns count of removed events for metrics tracking

### Step 4: Create compaction/TTL job scheduler with optional activation flag

**Files:** `src/utils/compaction-job.ts`

**Dependencies:**

**Acceptance Criteria:**
  - CompactionJob class implements TTL cleanup based on config schedule
  - Scheduler respects enabled flag before running jobs
  - Logs compaction actions with timestamps

### Step 5: Add metrics collection for write latency and retention actions

**Files:** `src/utils/metrics-collector.ts`

**Dependencies:**

**Acceptance Criteria:**
  - MetricsCollector tracks writeLatency histogram
  - Tracks retentionActions count (size/time-based removals)
  - Exposes getMetrics() method returning structured metrics object

### Step 6: Integrate batch writer and retention enforcer into event store config

**Files:** `src/config/event-store-config.ts`

**Dependencies:**

**Acceptance Criteria:**
  - EventStoreConfig loads retention settings from schema
  - Instantiates BatchWriter with configured parameters
  - Returns metrics collector instance for monitoring

### Step 7: Add unit tests for batch writer, retention enforcer, and compaction job

**Files:** `src/__tests__/batch-writer.test.ts`, `src/__tests__/retention-enforcer.test.ts`, `src/__tests__/compaction-job.test.ts`

**Dependencies:**

**Acceptance Criteria:**
  - BatchWriter tests cover size-triggered and time-triggered flushes
  - RetentionEnforcer tests verify both size and age-based removals
  - CompactionJob tests confirm scheduler respects enabled flag

### Step 8: Add integration test for metrics collection with write/retention flows

**Files:** `src/__tests__/metrics-integration.test.ts`

**Dependencies:**

**Acceptance Criteria:**
  - Integration test writes events and verifies latency metrics recorded
  - Retention actions trigger metric increments verified in test
  - Metrics structure validated against expected schema

## Risks

1. Existing event store may have incompatible write patterns requiring refactoring
2. Performance impact of batched writes on high-throughput scenarios needs benchmarking
3. Retention enforcement could cause data loss if not properly tested with edge cases

## Open Questions

1. What is the expected maximum batch size for typical workloads?
2. Should retention enforcement be synchronous or background job?
3. Do we need persistence of metrics across restarts?

