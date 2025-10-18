import { LogEntry } from './logEntry';
describe('LogEntry', () => {
  it('should create an instance of LogEntry', () => {
    const logEntry = new LogEntry(new Date(), 'Hello World!');
    expect(logEntry).toBeInstanceOf(LogEntry);
  });
});