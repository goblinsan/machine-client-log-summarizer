import * as fs from 'fs';
import * as path from 'path';
export async function fileIngest(filePath: string): Promise<void> {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    const json = JSON.parse(data);
    console.log(json);
  } catch (error) {
    console.error(error);
  }