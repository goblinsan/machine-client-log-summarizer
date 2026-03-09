import crypto from 'crypto';

export interface HashInput {
  ts?: string;
  msg?: string;
  persona?: string;
  workflowId?: string;
  corrId?: string;
  preview_raw?: string;
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

export function isDuplicate(hash: string, seenHashes: Set<string>): boolean {
  return seenHashes.has(hash);
}

export function markSeen(hash: string, seenHashes: Set<string>): void {
  seenHashes.add(hash);
}

export function getSeenCount(seenHashes: Set<string>): number {
  return seenHashes.size;
}