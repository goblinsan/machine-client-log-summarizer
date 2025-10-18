import { join } from 'path';
 try {
   const jsonData = JSON.parse(fs.readFileSync(join(process.cwd(), filePath), 'utf8'));
   return normalizeRecords(jsonData);
 } catch (error) {
   console.error(`Error reading file ${filePath}:`, error);
   throw error;
 }
 // Implement logic to normalize records here
 // For now, just return the data as is
 return Object.keys(data).map((key) => ({ timestamp: new Date(), message: key, data: [data[key]] }));