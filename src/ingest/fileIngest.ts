import { readFileSync } from 'fs';
import { LogEntry } from './logEntry';
export class FileIngest {
  private filePath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }
  public async readJsonFile(): Promise<LogEntry[]> {
    try {
      const jsonData = JSON.parse(readFileSync(this.filePath, 'utf8'));
      return [this.normalizeRecord(jsonData)];
    } catch (error) {
      throw new Error(`Error reading file: ${this.filePath}`);
    }
  }
  private normalizeRecord(record: any): LogEntry {
    const normalizedRecord = { timestamp: new Date(), message: '', data: {} };
    if (record.timestamp) {
      normalizedRecord.timestamp = new Date(record.timestamp);
    } else if (record.time) {
      normalizedRecord.timestamp = new Date(record.time);
    }
    if (typeof record.message === 'string') {
      normalizedRecord.message = record.message;
    }
    if (record.data && typeof record.data === 'object') {
      const dataProperties: any[] = [];
      Object.keys(record.data).forEach((key) => {
        const propertyValue = record.data[key];
        if (Array.isArray(propertyValue)) {
          dataProperties.push({ type: 'array', items: propertyValue });
        } else if (typeof propertyValue === 'object') {
          dataProperties.push({ type: 'object', properties: propertyValue });
        }
      });
      normalizedRecord.data = { type: 'object', properties: dataProperties };
    }
    return normalizedRecord;
  }
}