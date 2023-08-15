import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Head from './index'
import '@testing-library/jest-dom'

let filter: string | null = null
const changeFilter = (newFilter: string) => {
    filter = newFilter
}

describe('Header integration test', () => {
    it('should by render with column ["first", "second"]', () => {
        render(
            <table>
                <Head
                    columns={['first', 'second']}
                    filter={{ filter: 'first', order: '' }}
                    changeFilter={changeFilter}
                />
            </table>
        )

        const firstColumnHeader = screen.getByText(/first/i)
        expect(firstColumnHeader).toBeInTheDocument()
        fireEvent.click(firstColumnHeader)
        expect(filter).toEqual('first')

        const secondColumnHeader = screen.getByText(/second/i)
        expect(secondColumnHeader).toBeInTheDocument()
        fireEvent.click(secondColumnHeader)
        expect(filter).toEqual('second')
    })

    it('should by render with column ["first", "second"]', () => {
        render(
            <table>
                <Head
                    columns={['first', 'second']}
                    filter={{ filter: 'first', order: '' }}
                    changeFilter={changeFilter}
                    options={[null, 'renamed-second']}
                />
            </table>
        )

        const firstColumnHeader = screen.getByText(/first/i)
        expect(firstColumnHeader).toBeInTheDocument()
        fireEvent.click(firstColumnHeader)
        expect(filter).toEqual('first')

        const secondColumnHeader = screen.getByText(/renamed-second/i)
        expect(secondColumnHeader).toBeInTheDocument()
        fireEvent.click(secondColumnHeader)
        expect(filter).toEqual('second')
    })
})
