import fs from 'fs';
import path from 'path';

export function readJsonFile(filePath: string): any {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

export function normalizeRecord(record: any): any {
  return {
    timestamp: record.timestamp,
    level: record.level,
    message: record.message,
    service: record.service,
    host: record.host
  };
}

export function processFile(filePath: string): any[] {
  const data = readJsonFile(filePath);
  return [normalizeRecord(data)];
}

export default {
  readJsonFile,
  normalizeRecord,
  processFile
};