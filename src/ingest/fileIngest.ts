import { readFileSync } from 'fs';
import { join } from 'path';
export class FileIngest {
  private readonly logEntryRegex = /"timestamp":\s*"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)",\s*"message":\s*"([^"]+)"/g;
  public readJsonFile(filePath: string): LogEntry {
    const fileContent = readFileSync(join(process.cwd(), filePath), 'utf8');
    let match;

    while ((match = this.logEntryRegex.exec(fileContent)) !== null) {
      return {
        timestamp: new Date(match[1]),
        message: match[2],
      };
    }

    throw new Error(`Invalid JSON file format at ${filePath}`);
  }
}