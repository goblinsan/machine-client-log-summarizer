import { fileIngest } from './fileIngest';

describe('fileIngest', () => {
  it('should return normalized records from a JSON file', async () => {
    const filePath = 'path/to/example.json';
    const expectedRecords = [
      { timestamp: new Date('2022-01-01T12:00:00.000Z'), message: 'example message', data: [] },
      { timestamp: new Date('2022-01-02T13:00:00.000Z'), message: 'another example message', data: [1, 2, 3] },
    ];

    const actualRecords = fileIngest(filePath);
    expect(actualRecords).toEqual(expectedRecords);
  });
});