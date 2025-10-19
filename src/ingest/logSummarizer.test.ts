import { ingestLogRecords } from './ingestion';

describe('log summarizer', () => {
  it('should return an empty array when no files are provided', async () => {
    expect(await ingestLogRecords([])).toEqual([]);
  });
});