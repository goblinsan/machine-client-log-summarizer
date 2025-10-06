import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Mock the fileIngest module to simulate a failing test
jest.mock('./ingest/fileIngest', () => ({
  parseJsonFile: jest.fn().mockRejectedValue(new Error('Failed to parse JSON file')),
}));

describe('App', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText(/log summarizer/i)).toBeInTheDocument();
  });

  it('should fail when trying to parse a JSON file', () => {
    const { getByText } = render(<App />);
    expect(getByText(/failed to parse json file/i)).toBeInTheDocument();
  });
});
