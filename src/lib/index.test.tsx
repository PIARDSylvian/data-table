import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactDataTable from './index';
import '@testing-library/jest-dom'

test('renders data-table with empty array', () => {
  render(<ReactDataTable data={[]} />);
  const dataTable = screen.getByText(/no data/i);
  expect(dataTable).toBeInTheDocument();
});