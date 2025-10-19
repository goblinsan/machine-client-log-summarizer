export class FileIngest {
  async readJsonFile(filePath: string): Promise<LogEntry[]> {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  }
}