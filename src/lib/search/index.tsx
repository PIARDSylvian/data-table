import style from './style.module.scss'

interface Props {
  search: string
  changeSearch: (data: string)=>void
}

/**
 * Render Search
 * 
 * @param {Props} props
 * @param {string} props.search
 * @param {Function} props.changeSearch
 * 
 * @returns {JSX.Element}
 */
export default function Search({search, changeSearch}: Props): JSX.Element {
  return (
    <div className={style['table-search']}>
      <label htmlFor="table-search">Search:</label>
      <input type="search" id="table-search" value={search} onChange={(e) => changeSearch(e.target.value)} />
    </div>
  )
}