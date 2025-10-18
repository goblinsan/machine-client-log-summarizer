import { fileIngest } from './fileIngest';

export async function logSummarizer(file: string): Promise<any[]> {
  const records = await fileIngest(file);
  // ...
}