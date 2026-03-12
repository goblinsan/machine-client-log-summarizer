import { computeHash, HashInput, HashRecord } from './hash';

/**
 * Deduplication utility for filtering duplicate log records
 * Uses stable hash computation to identify and filter duplicates
 */
export class DeduplicationTracker {
  private seenHashes: Set<string> = new Set();

  /**
   * Process a single record and return whether it's a duplicate
   */
  processRecord(record: HashRecord): {
    isDuplicate: boolean;
    hash: string;
  } {
    const hash = computeHash(record);
    const isDuplicate = this.seenHashes.has(hash);

    if (!isDuplicate) {
      this.seenHashes.add(hash);
    }

    return { isDuplicate, hash };
  }

  /**
   * Process multiple records and return filtered unique records
   */
  processBatch(records: HashRecord[]): {
    uniqueRecords: HashRecord[];
    duplicateRecords: HashRecord[];
    stats: {
      totalRecords: number;
      uniqueRecords: number;
      duplicateRecords: number;
    };
  } {
    const uniqueRecords: HashRecord[] = [];
    const duplicateRecords: HashRecord[] = [];

    for (const record of records) {
      const { isDuplicate, hash } = this.processRecord(record);

      if (isDuplicate) {
        duplicateRecords.push(record);
      } else {
        uniqueRecords.push(record);
      }
    }

    return {
      uniqueRecords,
      duplicateRecords,
      stats: {
        totalRecords: records.length,
        uniqueRecords: uniqueRecords.length,
        duplicateRecords: duplicateRecords.length,
      },
    };
  }

  /**
   * Reset the tracker to start fresh
   */
  reset(): void {
    this.seenHashes.clear();
  }
}

export const deduplicationTracker = new DeduplicationTracker();
export default deduplicationTracker;