/**
 * Parses a JSON log file content and returns normalized records.
 * Each line is expected to be a valid JSON object.
 *
 * @param content - The raw content of the JSON log file
 * @returns An array of normalized log records
 */
export function parseJsonFile(content: string): Record<string, any>[] {
  if (!content.trim()) {
    return [];
  }

  const lines = content.split('\n');
  const records: Record<string, any>[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === '') {
      continue;
    }

    try {
      const parsed = JSON.parse(trimmedLine);
      records.push(parsed);
    } catch (error) {
      // Silently ignore malformed JSON lines
      console.warn(`Skipping malformed JSON line: ${trimmedLine}`);
    }
  }

  return records;
}