# Plan Iteration 2

Generated: 2026-03-14T23:02:59.480Z

## Implementation Plan

### Step 1: Define retention policy schema and types

**Files:** `src/config/schema.ts`

**Dependencies:**

**Acceptance Criteria:**
  - Schema includes size-based retention (maxBytes, maxEvents)
  - Schema includes time-based retention (retentionDays, ttlSeconds)
  - Validation rejects invalid combinations (e.g., zero values)

### Step 2: Implement batched write queue with latency tracking

**Files:** `src/utils/batched-writer.ts`

**Dependencies:**

**Acceptance Criteria:**
  - BatchWriter class accepts configurable batchSize and flushIntervalMs
  - Write operations are queued until batch is full or interval expires
  - Metrics object exposes writeLatencyMs (histogram)
  - Unit tests verify batching behavior with mock timers

### Step 3: Implement retention policy enforcement engine

**Files:** `src/config/retention-engine.ts`

**Dependencies:**

**Acceptance Criteria:**
  - RetentionEngine class reads config from event-store-config.ts
  - Enforces size limits by removing oldest entries when exceeded
  - Enforces time limits by removing entries older than retentionDays
  - Metrics expose retentionActionsCount (counter) and bytesFreed

### Step 4: Implement optional compaction/TTL job scheduler

**Files:** `src/config/compaction-job.ts`

**Dependencies:**

**Acceptance Criteria:**
  - CompactionJob class runs on configurable cron schedule (default disabled)
  - TTL job removes expired entries based on event timestamp + ttlSeconds
  - Metrics expose compactionRunsCount and avgDurationMs
  - Config flag 'enableCompaction' controls job activation

### Step 5: Integrate retention engine with event store config loader

**Files:** `src/config/loader.ts`

**Dependencies:**

**Acceptance Criteria:**
  - Config loader validates retention policy fields against schema
  - Default values applied when optional fields omitted (e.g., 30 days retention)
  - Integration tests verify config parsing with various retention settings

### Step 6: Add metrics export endpoint/interface

**Files:** `src/config/metrics-export.ts`

**Dependencies:**

**Acceptance Criteria:**
  - MetricsExporter class exposes getMetrics() returning structured object
  - Includes writeLatencyMs, retentionActionsCount, compactionRunsCount
  - Export format compatible with Prometheus/Grafana or similar

### Step 7: Write comprehensive tests for all new components

**Files:** `src/__tests__/retention-engine.test.ts`, `src/__tests__/batched-writer.test.ts`

**Dependencies:**

**Acceptance Criteria:**
  - Test coverage >80% for new files
  - Edge cases tested: empty batches, rapid writes, boundary retention values
  - Integration tests verify end-to-end flow with mock event store

## Risks

1. Backward compatibility: existing configs without retention fields may need defaults
2. Performance impact of batched writes on high-throughput scenarios
3. Compaction jobs could cause temporary I/O spikes during execution

## Open Questions

1. What is the default retention period for new deployments?
2. Should compaction be configurable per-event-type or global?
3. Do we need persistence of metrics between restarts?

