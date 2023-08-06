import { useState, useEffect } from 'react'
import { DataInterface } from "../types"
import style from './style.module.scss'

interface PropsInterface {
  table: DataInterface[],
  entries: number,
  changePaginatedData: (data: DataInterface[])=>void
}

/**
 * Render Data Table Footer
 * 
 * @param {PropsInterface} props
 * @param {DataInterface[]} props.data data to paginate
 * @param {number} props.entries number to paginate
 * @param {Function} props.changePaginatedData fonction to set paginated data
 * 
 * @returns {JSX.Element}
 */
export default function Foot({table, entries, changePaginatedData}: PropsInterface): JSX.Element {
  const [index, setIndex] = useState<number>(1);
  const step = Math.ceil(table.length / entries)

  const paginateButton = [];
  for (let idx = 1; idx <= step; idx++) {
    if(idx >= index-1 && idx < index + 2) {
      paginateButton.push(<button className={(index === idx)? style['current']: ''} key={`page-${idx}`} onClick={()=>paginate(idx)}>{idx}</button>)
    }    
  }

  //if table or number entries change set index to 1
  useEffect(()=> setIndex(1), [table, entries])

  //if index change use changePaginatedData
  useEffect(()=> changePaginatedData((table.slice((index-1) * entries, index * entries))), [index, entries, table])

  const paginate = (index: number) => {
    if(index < 1) setIndex(1)
    else if (index > step) setIndex(step)
    else setIndex(index)
  }

  return (
    <div className={style['table-footer']}>
      <div>
        <p>{`Showing ${((index-1) * entries) + 1} to ${(index * entries > table.length)? table.length: index * entries} of ${table.length} entries`}</p>
      </div>
      <div>
        <button onClick={()=>paginate(index-1)}>Previous</button>
        {paginateButton}
        <button onClick={()=>paginate(index+1)}>Next</button>
      </div>
    </div>
  )
}