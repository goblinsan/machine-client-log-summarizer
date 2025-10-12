export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
}

export interface IngestionResult {
  records: LogRecord[];
}

export async function processFile(file: File): Promise<LogRecord[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        if (!Array.isArray(parsed.records)) {
          resolve([]);
          return;
        }

        const normalizedRecords = parsed.records.map((record: any) => ({
          timestamp: record.timestamp || '',
          level: record.level || '',
          message: record.message || ''
        }));

        resolve(normalizedRecords);
      } catch (error) {
        // Log error or handle gracefully
        resolve([]);
      }
    };

    reader.onerror = function () {
      // Handle file reading errors
      resolve([]);
    };

    reader.readAsText(file);
  });
}