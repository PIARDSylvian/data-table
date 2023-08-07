import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ReactDataTable from './index';
import '@testing-library/jest-dom'

const testArray=[{
  1 : 'bc',
  2 : 'cc'
},{
  1 : 'ab',
  2 : 'dc',
},{
  1 : 'be',
  2 : 'aa',
}]

describe('Data-table integration test', () => {
  it('should by renders with empty array', () => {
    render(<ReactDataTable data={[]} />);
    const dataTable = screen.getByText(/no data/i);
    expect(dataTable).toBeInTheDocument();
  });
})