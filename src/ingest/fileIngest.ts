import { readFileSync } from 'fs';

export function ingestFile(filePath: string): any[] {
  const fileContent = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);