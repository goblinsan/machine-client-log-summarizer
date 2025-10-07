// App.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Mock the fileIngest module to simulate different scenarios
jest.mock('./ingest/fileIngest', () => ({
  parseLogContent: jest.fn(),
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Log Summarizer')).toBeInTheDocument();
  });

  it('handles parsing error gracefully', () => {
    const mockParseLogContent = require('./ingest/fileIngest').parseLogContent;
    mockParseLogContent.mockImplementation(() => {
      throw new Error('Failed to parse log content');
    });

    const { getByText } = render(<App />);
    expect(getByText(/Failed to parse log content/i)).toBeInTheDocument();
  });
});
