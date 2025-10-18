export function fileIngest(filePath: string): any {
  try {
    const data = require('fs').readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }