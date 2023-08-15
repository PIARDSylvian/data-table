import { ChangeEvent, useEffect } from 'react'
import style from './style.module.scss'

interface Props {
    entries: number
    changeEntries: (e: number) => void
    options?: null | string[]
}

/**
 * Render Select
 *
 * @param {Props} props
 * @param {number} props.entries
 * @param {Function} props.changeEntries
 * @param {null | string[]} [props.options]
 *
 * @returns {JSX.Element}
 */
export default function Select({
    entries,
    changeEntries,
    options,
}: Props): JSX.Element {
    useEffect(() => {
        if (options) {
            const [firstOption] = options
            changeEntries(parseInt(firstOption, 10))
        }
    }, [])

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) =>
        changeEntries(parseInt(event.target.value, 10))

    return (
        <>
            <div className={style['table-select-entries']}>
                <label htmlFor="select-entries">Show</label>
                <select
                    id="select-entries"
                    value={entries}
                    onChange={(e) => handleSelectChange(e)}
                >
                    {options ? (
                        options.map((option, idx) => (
                            <option key={`option-${idx}`} value={`${option}`}>
                                {option}
                            </option>
                        ))
                    ) : (
                        <>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </>
                    )}
                </select>
                <p>entries</p>
            </div>
        </>
    )
}
