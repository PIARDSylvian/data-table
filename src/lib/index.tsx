import { useState, useEffect } from 'react'
import Head from './head'
import Select from './select'
import Search from './search'
import reorder from './utils'
import Foot from './foot'
import { isValid, format, parseISO } from 'date-fns'
import style from './style.module.scss'
import { InitialState, Data, Option } from "./types"

const INITIAL_STATE = {
  filters: {
    filter: '',
    order: ''
  },
  entries: 10,
  search: '',
  data: []
}

interface Props {
  data: Data[]
  option?: Option | null
}

/**
 * Render React Data Table
 * 
 * @param {Props} props
 * @param {Data[]} props.data data to make table
 * @param {null | Option} props.option option to make table
 * 
 * @returns {JSX.Element}
 */
export default function ReactDataTable({data , option = null}: Props): JSX.Element {
  const [filters, setFilter] = useState<InitialState['filters']>(INITIAL_STATE.filters);
  const [entries, setEntries] = useState<InitialState['entries']>(INITIAL_STATE.entries);
  const [search, setSearch] = useState<InitialState['search']>(INITIAL_STATE.search);
  const [dataTable, setDataTable] = useState<InitialState['data']>(INITIAL_STATE.data);
  const [paginatedData, setPaginatedData] = useState<InitialState['data']>(INITIAL_STATE.data);

  // Get First Element with destructuring
  const [firstElement] = data;

  // Get All key of element
  const columnsHeader = (!data || data.length < 1)? []: Object.keys(firstElement);

  useEffect(() => {
    setFilter({filter: columnsHeader[0], order: 'asc'})
  }, [])

  useEffect(()=>{
      setDataTable(reorder(filters, search, data ))
  },[filters, search, data])

  const changeFilter = (column: InitialState['filters']['filter']) => {
    const order = (column === filters.filter && filters.order === 'asc')? 'desc' : 'asc'
    setFilter({filter: column, order: order})
  }
    
  const changeEntries = (entries: string | number) => setEntries((typeof entries == 'number')? entries :parseInt(entries, 10))
  const changeSearch = (search: string) => setSearch(search)

  const changePaginatedData = (paginatedData: Data[]) => setPaginatedData(paginatedData)

  const isDate = (date: string): string | false => {
    const formatDate = parseISO(date)
    return (isValid(formatDate))? format(formatDate, 'dd/MM/yyyy'): false;
  }

  return (
    <>
    <div className={style['data-table']}>
      {
      (!data || data.length < 1) 
        ? 'no data'
        :
        <>
        <div className={style['table-header']}>
          <Select entries={entries} changeEntries={changeEntries} options={option?.select}/>
          <Search search={search} changeSearch={changeSearch}/>
        </div>
        <table className={style['table']}>
          <Head columns={columnsHeader} filter={filters} changeFilter={changeFilter} options={option?.head}/>
          <tbody className={style.tbody}>
            {paginatedData.map((row,idx)=>(
              <tr key={`${idx}-row`} className={style.tr}>
                {columnsHeader.map((column, idx)=>(<td key={`column-${idx}`} className={`${(column === filters.filter)? style['filter']: ''}`}>{(isDate(row[column]))? isDate(row[column]) : row[column]}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
        <Foot table={dataTable} entries={entries} changePaginatedData={(changePaginatedData)}/>
        </>
      } 
    </div>
    </>
  )
}