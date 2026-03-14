/**
 * Event Store Schema Configuration
 * Defines table structures and index configurations for event persistence
 */
import { LogEvent, EventMeta, EventStoreIndex } from '../types/logEvent';
import { WRITE_LATENCY_TARGET_MS } from '../types/logEvent';

/**
 * Events table schema definition
 */
export const eventsTableSchema = {
  name: 'events',
  columns: [
    { name: 'ts', type: 'string', required: true, indexed: true },
    { name: 'level', type: 'string', required: true },
    { name: 'persona', type: 'string', required: false },
    { name: 'workflow_id', type: 'string', required: false, indexed: true },
    { name: 'projectId', type: 'string', required: false },
    { name: 'corrId', type: 'string', required: false },
    { name: 'hash', type: 'string', required: false },
    { name: 'type', type: 'string', required: true, indexed: true },
  ],
};

/**
 * Event metadata table schema definition
 */
export const eventMetaTableSchema = {
  name: 'event_meta',
  columns: [
    { name: 'event_id', type: 'string', required: true, indexed: true },
    { name: 'workflow_id', type: 'string', required: true, indexed: true },
    { name: 'persona', type: 'string', required: false },
    { name: 'type', type: 'string', required: true, indexed: true },
    { name: 'ts', type: 'string', required: true, indexed: true },
    { name: 'metadata', type: 'object', required: false },
  ],
};

/**
 * Index definitions for event store queries
 */
export const indexDefinitions: EventStoreIndex[] = [
  { name: 'idx_ts', fields: ['ts'], composite: false },
  { name: 'idx_workflow_ts', fields: ['workflow_id', 'ts'], composite: true },
  { name: 'idx_persona_ts', fields: ['persona', 'ts'], composite: true },
  { name: 'idx_type_ts', fields: ['type', 'ts'], composite: true },
];

/**
 * Write performance target configuration
 */
export const writePerformanceConfig = {
  targetLatencyMs: WRITE_LATENCY_TARGET_MS, // p95 for batched writes
  batchingEnabled: true,
};

/**
 * Complete event store schema configuration
 */
export const eventStoreConfig = {
  tables: [eventsTableSchema, eventMetaTableSchema],
  indexes: indexDefinitions,
  performance: writePerformanceConfig,
};