import React from 'react';
import { render } from '@testing-library/react';
import ExampleComponent from '../../src/components/ExampleComponent';

describe('ExampleRegressionTest', () => {
  it('should render without crashing', () => {
    const { container } = render(<ExampleComponent />);
    expect(container).toBeInTheDocument();
  });
});