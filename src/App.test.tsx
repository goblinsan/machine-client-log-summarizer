import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('renders the main App component', () => {
    const { getByText } = render(<App />);
    expect(getByText(/machine client log summarizer/i)).toBeInTheDocument();
  });
});
