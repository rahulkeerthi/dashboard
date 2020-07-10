import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Arrange - Act - Assert

describe('App', () => {
  test('renders AppBar component', () => {
    render(<App />);
    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  test('renders DataTable component', () => {
    render(<App />);
    expect(screen.getByText('Providers Database')).toBeInTheDocument();
  });
});

// ! Things to Test:
// * API calls work as intended (return data, data has structure, error is handled by App)
// * Key components render correctly (App, DataTable, AppBar, TineySpinner)
// * Renders correct output with props (DataTable, DataTable detail panels, TineySpinner)
// * States: Disabled personal detail panel for children table (vs providers table), isLoading
// * Validation: Alert triggered and db not updated if new provider under 18
// * Events: tab links, search, filter, pagination, new entry
// * Edge case: Empty database, missing data fields, 10000 items in db
