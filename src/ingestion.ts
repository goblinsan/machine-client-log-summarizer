/**
 * Parses JSON content from a file
 * @param content - The raw file content as string
 * @returns Parsed JSON object
 * @throws Error if content is not valid JSON
 */
export const parseJsonFile = (content: string): any => {
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Invalid JSON content: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Processes a file and returns parsed JSON data
 * @param file - The file to process
 * @returns Parsed JSON object or rejects with error if invalid
 */
export const processFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        const parsed = JSON.parse(content);
        resolve(parsed);
      } catch (error) {
        reject(new Error(`Failed to parse file: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};