import '@testing-library/jest-dom'
import reorder from './index';

const data = [{
  1 : 'bc',
  2 : 'cc'
},{
  1 : 'ab',
  2 : 'dc',
},{
  1 : 'be',
  2 : 'aa',
}]

describe('Reorder Unit test',()=>{
  it('sould be reorder with filter 1 order asc', () => {
    const filters = {filter: '1', order: 'asc'}
    const reorderedData = reorder(filters, '', [...data])
    expect(reorderedData[0]).toEqual({1: 'ab', 2: 'dc'});
  })
  it('sould be reorder with filter 2 order asc', () => {
    const filters = {filter: '2', order: 'asc'}
    const reorderedData = reorder(filters, '', [...data])
    expect(reorderedData[0]).toEqual({1: 'be', 2: 'aa'});
  })
  it('sould be reorder with filter 1 order desc', () => {
    const filters = {filter: '1', order: 'desc'}
    const reorderedData = reorder(filters, '', [...data])
    expect(reorderedData[0]).toEqual({1: 'be', 2: 'aa'});
  })
  it('sould be reorder with filter 2 order desc', () => {
    const filters = {filter: '2', order: 'desc'}
    const reorderedData = reorder(filters, '', [...data])
    expect(reorderedData[0]).toEqual({1: 'ab', 2: 'dc'});
  })
  it('sould be reorder with filter 1 order asc and search "a"', () => {
    const filters = {filter: '1', order: 'asc'}
    const reorderedData = reorder(filters, 'a', [...data])
    expect(reorderedData.length).toEqual(2);
    expect(reorderedData[0]).toEqual({1: 'ab', 2: 'dc'});
    expect(reorderedData[1]).toEqual({1: 'be', 2: 'aa'});
  })
  it('sould be reorder with filter 1 order desc and search "a"', () => {
    const filters = {filter: '1', order: 'desc'}
    const reorderedData = reorder(filters, 'a', [...data])
    expect(reorderedData.length).toEqual(2);
    expect(reorderedData[0]).toEqual({1: 'be', 2: 'aa'});
    expect(reorderedData[1]).toEqual({1: 'ab', 2: 'dc'});
  })
})