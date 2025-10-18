import { promises as fs } from 'fs';
export async function processLogFiles(fileList: string[]): Promise<any> {
  const fileContents = await Promise.all(
    fileList.map(async (file) => {
      try {
        return JSON.parse(await fs.readFile(file, 'utf8'));
      } catch (error) {
        console.error(`Error reading ${file}:`, error);
        return null;
      }
    })
  );

  // Normalize and summarize log entries
  const normalizedRecords = fileContents.filter((entry) => entry !== null).map((entry) => ({
    timestamp: entry.timestamp,
    client_id: entry.client_id,
    // Add other relevant fields as needed
  }));

  return normalizedRecords;