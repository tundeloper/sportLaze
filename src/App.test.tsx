import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import App from './App';

test('renders home route', () => {
  render(
    <MemoryRouter initialEntries={['/']}> {/* Set initial route */}
      <App />
    </MemoryRouter>
  );

  // Example: Check for some content on the home route
  const homeContent = screen.getByText(/Loading.../i); // Adjust based on your home content
  expect(homeContent).toBeInTheDocument();
});