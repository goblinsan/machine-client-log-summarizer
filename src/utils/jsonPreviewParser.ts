/**
 * Parses JSON content from preview fields
 * Handles both fenced and bare JSON content
 */

export interface ParsedPreview {
  status?: 'pass' | 'fail';
  [key: string]: unknown;
}

/**
 * Parses JSON content and extracts status field
 * Returns undefined if parsing fails
 */
export function parseJSON(content: unknown): ParsedPreview | undefined {
  if (typeof content !== 'string') {
    return undefined;
  }

  try {
    const parsed = JSON.parse(content);
    const result = parsed as ParsedPreview;
    return result;
  } catch {
    return undefined;
  }
}

/**
 * Extracts status from parsed preview
 * Supports various status field names
 */
export function extractStatus(parsed: ParsedPreview): 'pass' | 'fail' | undefined {
  const statusFields = ['status', 'result', 'outcome', 'success', 'error'];
  for (const field of statusFields) {
    const value = parsed[field];
    if (value === 'pass' || value === 'fail') {
      return value;
    }
  }
  return undefined;
}