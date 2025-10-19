export interface LogEntry {
  timestamp: Date;
  message: string;
  data?: { type: 'array'; items: any[] } | { type: 'object'; properties: any };
}