export interface LogEntry {
  timestamp: Date;
  message: string;
  data?: { type: 'array' }[];