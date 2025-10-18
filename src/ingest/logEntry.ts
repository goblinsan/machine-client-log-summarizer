export interface LogEntry {
  timestamp: Date;
  message: string;
}

export function createLogEntry(timestamp: Date, message: string): LogEntry {
  return { timestamp, message };
}