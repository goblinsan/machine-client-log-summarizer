import { logSummarizer } from './ingest/logSummarizer';
export default async function App(): Promise<JSX.Element> {
  const records = await logSummarizer('example.json');
  // ...
}