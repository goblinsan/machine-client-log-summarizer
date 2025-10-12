export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
}

export async function processFile(file: File): Promise<LogRecord[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        if (!content) {
          reject(new Error('Empty file content'));
          return;
        }

        const lines = content.split('\n').filter(line => line.trim() !== '');
        const records: LogRecord[] = [];

        for (const line of lines) {
          try {
            const parsed = JSON.parse(line.trim());

            // Normalize the record with required fields
            const normalizedRecord: LogRecord = {
              timestamp: parsed.timestamp || '',
              level: parsed.level || 'UNKNOWN',
              message: parsed.message || ''
            };

            records.push(normalizedRecord);
          } catch (parseError) {
            throw new Error('Invalid JSON in file');
          }
        }

        resolve(records);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}