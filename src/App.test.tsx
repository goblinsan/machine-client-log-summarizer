import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { parseLogContent } from './ingest/fileIngest';

jest.mock('./ingest/fileIngest', () => ({
  parseLogContent: jest.fn(),
}));

const mockParseLogContent = parseLogContent as jest.MockedFunction<typeof parseLogContent>;

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to the Log Summarizer/i)).toBeInTheDocument();
  });

  it('displays parsed log records when content is provided', () => {
    const mockRecords = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'INFO', message: 'Test log entry' },
    ];

    mockParseLogContent.mockReturnValue(mockRecords);

    render(<App />);
    expect(screen.getByText(/Test log entry/i)).toBeInTheDocument();
  });
});
