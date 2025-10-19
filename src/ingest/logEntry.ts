export interface LogEntry {
  timestamp: Date;
  message: string;
  data?: any[] | null;
}