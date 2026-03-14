/**
 * Migration: Create Event Tables
 * Version: 001
 * Description: Creates events and event_meta tables with required indexes
 */
import { eventsTableSchema, eventMetaTableSchema } from '../event-store-config';

export const migrationName = '001_create_event_tables';
export const migrationDescription = 'Create events and event_meta tables with indexes';

/**
 * SQL statements for creating the events table
 */
export function getEventsTableSQL(): string {
  return `
    CREATE TABLE IF NOT EXISTS events (
      ts TEXT NOT NULL,
      level TEXT NOT NULL,
      persona TEXT,
      workflow_id TEXT,
      project_id TEXT,
      corr_id TEXT,
      hash TEXT,
      type TEXT NOT NULL
    );
  `;
}

/**
 * SQL statements for creating the event_meta table
 */
export function getEventMetaTableSQL(): string {
  return `
    CREATE TABLE IF NOT EXISTS event_meta (
      event_id TEXT PRIMARY KEY,
      workflow_id TEXT NOT NULL,
      persona TEXT,
      type TEXT NOT NULL,
      ts TEXT NOT NULL,
      metadata JSONB
    );
  `;
}

/**
 * SQL statements for creating indexes on events table
 */
export function getEventsIndexesSQL(): string {
  return `
    CREATE INDEX IF NOT EXISTS idx_events_ts ON events(ts);
    CREATE INDEX IF NOT EXISTS idx_events_workflow_ts ON events(workflow_id, ts);
    CREATE INDEX IF NOT EXISTS idx_events_persona_ts ON events(persona, ts);
    CREATE INDEX IF NOT EXISTS idx_events_type_ts ON events(type, ts);
  `;
}

/**
 * SQL statements for creating indexes on event_meta table
 */
export function getEventMetaIndexesSQL(): string {
  return `
    CREATE INDEX IF NOT EXISTS idx_event_meta_workflow_id ON event_meta(workflow_id);
    CREATE INDEX IF NOT EXISTS idx_event_meta_ts ON event_meta(ts);
  `;
}