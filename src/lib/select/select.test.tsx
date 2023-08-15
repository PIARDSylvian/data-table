import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Select from './index'
import '@testing-library/jest-dom'
import exp from 'constants'

let entrie: number | null = null
const changeEntries = (newEntries: number) => {
    entrie = newEntries
}

describe('Search integration test', () => {
    it('should by render', () => {
        render(<Select entries={10} changeEntries={changeEntries} />)
        const input = screen.getByLabelText('Show')
        const option = screen.getByText('25') as HTMLOptionElement
        fireEvent.change(input, { target: { value: option.value } })
        expect(entrie).toEqual(25)
    })

    it('should by render with option', () => {
        render(
            <Select
                entries={10}
                changeEntries={changeEntries}
                options={['8']}
            />
        )
        const input = screen.getByLabelText('Show')
        const option = screen.getByText('8') as HTMLOptionElement
        fireEvent.change(input, { target: { value: option.value } })
        expect(entrie).toEqual(8)
    })
})
