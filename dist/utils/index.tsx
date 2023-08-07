import { Data, Filter } from "../types"

export default function reorder(filters: Filter, search: string, data: Data[]): Data[] {
  const filteredElements = [...data]

  filteredElements.sort((a, b) => (a[filters.filter] > b[filters.filter]) ? 1 : -1)
  if (filters.order != 'asc') filteredElements.reverse()

  return (search !== '')? filterByValue(filteredElements, search): filteredElements;
}

function filterByValue(data: Data[], search: string): Data[] {
  return data.filter(o => Object.keys(o).some(k => o[k]?.toLowerCase().includes(search.toLowerCase())));
}