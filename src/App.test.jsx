import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders launches link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Launches/i);
  expect(linkElement).toBeInTheDocument();
});
