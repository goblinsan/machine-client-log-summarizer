/**
 * Ingestion module for processing log files
 */

/**
 * Process a file and parse its content as JSON
 * @param file - The file to process
 * @returns Promise resolving to parsed JSON object or rejecting with error
 */
export const processFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        // Validate that the file is actually a JSON file
        if (!file.name.endsWith('.json')) {
          reject(new Error('File must be a JSON file'));
          return;
        }

        const parsedContent = JSON.parse(content);
        resolve(parsedContent);
      } catch (err) {
        reject(new Error('Failed to parse file as JSON'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};