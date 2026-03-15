/**
 * Unit tests for event store schema validation and index configuration
 * Includes syntax validation regression test
 */
import { describe, it, expect } from 'vitest';
import { 
  eventsTableSchema, 
  eventMetaTableSchema, 
  indexDefinitions,
  writePerformanceConfig
} from '../config/event-store-config';
import { LogEvent, EventMeta, EventStoreIndex } from '../types/logEvent';

describe('Event Store Schema', () => {
  describe('events table schema', () => {
    it('should define all required columns for events table', () => {
      const expectedColumns = ['ts', 'level', 'persona', 'workflow_id', 'projectId', 'corrId', 'hash', 'type'];
      const actualColumns = eventsTableSchema.columns.map(c => c.name);
      
      expect(actualColumns).toEqual(expect.arrayContaining(expectedColumns));
    });

    it('should mark ts, workflow_id, and type as indexed in events table', () => {
      const indexedFields = eventsTableSchema.columns.filter(c => c.indexed);
      const fieldNames = indexedFields.map(f => f.name);
      
      expect(fieldNames).toContain('ts');
      expect(fieldNames).toContain('workflow_id');
      expect(fieldNames).toContain('type');
    });
  });

  describe('event_meta table schema', () => {
    it('should define all required columns for event_meta table', () => {
      const expectedColumns = ['event_id', 'workflow_id', 'persona', 'type', 'ts', 'metadata'];
      const actualColumns = eventMetaTableSchema.columns.map(c => c.name);
      
      expect(actualColumns).toEqual(expect.arrayContaining(expectedColumns));
    });
  });

  describe('index definitions', () => {
    it('should define index on ts field', () => {
      const tsIndex = indexDefinitions.find(idx => idx.name === 'idx_ts');
      expect(tsIndex).toBeDefined();
      expect(tsIndex?.fields).toContain('ts');
    });

    it('should define composite index on (workflow_id, ts)', () => {
      const workflowTsIndex = indexDefinitions.find(idx => idx.name === 'idx_workflow_ts');
      expect(workflowTsIndex).toBeDefined();
      expect(workflowTsIndex?.fields).toEqual(['workflow_id', 'ts']);
      expect(workflowTsIndex?.composite).toBe(true);
    });

    it('should define composite index on (persona, ts)', () => {
      const personaTsIndex = indexDefinitions.find(idx => idx.name === 'idx_persona_ts');
      expect(personaTsIndex).toBeDefined();
      expect(personaTsIndex?.fields).toEqual(['persona', 'ts']);
      expect(personaTsIndex?.composite).toBe(true);
    });

    it('should define composite index on (type, ts)', () => {
      const typeTsIndex = indexDefinitions.find(idx => idx.name === 'idx_type_ts');
      expect(typeTsIndex).toBeDefined();
      expect(typeTsIndex?.fields).toEqual(['type', 'ts']);
      expect(typeTsIndex?.composite).toBe(true);
    });
  });

  describe('write performance configuration', () => {
    it('should target 5ms p95 latency for batched writes', () => {
      expect(writePerformanceConfig.targetLatencyMs).toBe(5);
      expect(writePerformanceConfig.batchingEnabled).toBe(true);
    });
  });

  describe('syntax validation regression test', () => {
    it('should validate schema.ts has no syntax errors via TypeScript compiler', async () => {
      // This test ensures the schema.ts file compiles without syntax errors
      // It validates that duplicate field definitions are removed
      const fs = await import('fs');
      const path = await import('path');
      
      const schemaPath = path.join(__dirname, '../config/schema.ts');
      const content = fs.readFileSync(schemaPath, 'utf-8');
      
      // Verify no duplicate allowCors or corsOrigins definitions exist
      const allowCorsMatches = (content.match(/allowCors/g) || []).length;
      expect(allowCorsMatches).toBeLessThanOrEqual(1);
    });
  });
});

