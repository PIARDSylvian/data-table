import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Search from './index'
import '@testing-library/jest-dom'

let search: string | null = null
const changeSearch = (newSearch: string) => {
    search = newSearch
}

describe('Search integration test', () => {
    it('should by render', () => {
        render(<Search search={''} changeSearch={changeSearch} />)
        const input = screen.getByLabelText('Search:')
        fireEvent.change(input, { target: { value: 'valueToSearch' } })
        expect(search).toEqual('valueToSearch')
    })
})
