import { readFileSync } from 'fs';
import { LogEntry } from './logEntry';
export default class FileIngest {
  private filePath: string;