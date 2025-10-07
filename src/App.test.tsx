import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { parseJsonFile } from './ingest/fileIngest';

// Mock the parseJsonFile function to simulate file reading
jest.mock('./ingest/fileIngest', () => ({
  parseJsonFile: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the app', () => {
    render(<App />);
    expect(screen.getByText(/Log Summarizer/i)).toBeInTheDocument();
  });

  it('should parse JSON file and display logs', () => {
    const mockLogRecords = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'INFO', message: 'Application started' },
      { timestamp: '2023-01-01T00:01:00Z', level: 'ERROR', message: 'Failed to connect to database' },
    ];

    (parseJsonFile as jest.Mock).mockReturnValue(mockLogRecords);

    render(<App />);

    expect(parseJsonFile).toHaveBeenCalledWith(expect.any(String));
    expect(screen.getByText(/Application started/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to connect to database/i)).toBeInTheDocument();
  });

  it('should handle malformed JSON gracefully', () => {
    (parseJsonFile as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid JSON');
    });

    render(<App />);

    expect(parseJsonFile).toHaveBeenCalledWith(expect.any(String));
  });
});
