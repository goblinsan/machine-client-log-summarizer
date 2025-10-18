import { fileIngest } from './ingest/fileIngest';
import * as fs from 'fs';
import * as path from 'path';
export async function testFileIngest(): Promise<void> {
  try {
    await fileIngest('test.json');
  } catch (error) {
    console.error(error);
  }
}