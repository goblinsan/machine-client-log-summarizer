import { logSummarizer } from '../src/main';
export default async function replaceColors(): Promise<void> {
  const records = await logSummarizer('example.json');
  // ...
}