export interface LogRecord {
  timestamp?: string
  level?: string
  message?: string
  service?: string
}

export function processFileContent(content: string): LogRecord[] {
  if (!content || typeof content !== 'string') {
    return []
  }

  let parsedContent: unknown
  try {
    parsedContent = JSON.parse(content)
  } catch (error) {
    // Return empty array if content is not valid JSON
    return []
  }

  // Handle single object case
  if (parsedContent && typeof parsedContent === 'object' && !Array.isArray(parsedContent)) {
    return [normalizeRecord(parsedContent as Record<string, unknown>)]
  }

  // Handle array case
  if (Array.isArray(parsedContent)) {
    return parsedContent
      .map(item => {
        if (typeof item === 'object' && item !== null) {
          return normalizeRecord(item as Record<string, unknown>)
        }
        return null
      })
      .filter(Boolean) as LogRecord[]
  }

  // Return empty array for any other case
  return []
}

function normalizeRecord(record: Record<string, unknown>): LogRecord {
  const normalized: LogRecord = {}

  for (const [key, value] of Object.entries(record)) {
    const normalizedKey = key.toLowerCase()

    // Only include known fields
    if (['timestamp', 'level', 'message', 'service'].includes(normalizedKey)) {
      normalized[normalizedKey as keyof LogRecord] = value as string
    }
  }

  return normalized
}