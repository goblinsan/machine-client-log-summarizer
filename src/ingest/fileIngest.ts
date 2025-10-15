import fs from 'fs/promises';
import path from 'path';
async function fileIngest(filePath: string): Promise<any[]> {
  const fileContent = await fs.readFile(filePath, 'utf8');
  const jsonData = JSON.parse(fileContent);
  // Normalize records (e.g., extract relevant fields)
  return jsonData.map((record) => ({ ...record, normalized: true }));
}
export default fileIngest;