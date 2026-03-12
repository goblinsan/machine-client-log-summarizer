import { createHash } from 'crypto';

/**
 */
export function hash(data: string | object): string {
  const hash = createHash('sha256');
  const input = typeof data === 'string' ? data : JSON.stringify(data);
  hash.update(input);
  return hash.digest('hex');
}

/**
 * Generates a hash from a LogEvent object
 * @param event - The LogEvent to hash
 * @returns Hexadecimal hash string
 */
export function hashLogEvent(event: { ts: string; level: string; persona?: string; workflowId?: string; intent?: string; repo?: string; branch?: string; projectId?: string; corrId?: string; duration_ms?: number; preview?: string | object; paths?: string[]; source?: string }): string {
  const eventStr = JSON.stringify({
    ts: event.ts,
    level: event.level,
    persona: event.persona,
    workflowId: event.workflowId,
    intent: event.intent,
    repo: event.repo,
    branch: event.branch,
    projectId: event.projectId,
    corrId: event.corrId,
    duration_ms: event.duration_ms,
    preview: event.preview,
    paths: event.paths,
    source: event.source,
  });
  return hash(eventStr);
}

export function computeHash(input: HashInput): string {
  const fields: string[] = [];

  if (input.ts) fields.push(input.ts);
  if (input.msg) fields.push(input.msg);
  if (input.persona) fields.push(input.persona);
  if (input.workflowId) fields.push(input.workflowId);
  if (input.corrId) fields.push(input.corrId);
  if (input.preview_raw) {
    const preview = input.preview_raw.substring(0, 512);
    fields.push(preview);
  }

  const combined = fields.join('|');
  return crypto.createHash('sha256').update(combined).digest('hex');
}

export interface HashInput {
  ts?: string;
  msg?: string;
  persona?: string;
  workflowId?: string;
  corrId?: string;
  preview_raw?: string;
}

export type HashRecord = HashInput;

export function isDuplicate(hash: string, seenHashes: Set<string>): boolean {
  return seenHashes.has(hash);
}

export function markSeen(hash: string, seenHashes: Set<string>): void {
  seenHashes.add(hash);
}

export function getSeenCount(seenHashes: Set<string>): number {
  return seenHashes.size;
}

