import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Foot from './index'
import '@testing-library/jest-dom'

let paginatedData: any = null
const changePaginatedData = (newData: any) => {
    paginatedData = newData
}
const testArray = [
    {
        1: 'bc',
        2: 'cc',
    },
    {
        1: 'ab',
        2: 'dc',
    },
    {
        1: 'be',
        2: 'aa',
    },
]

describe('Footer integration test', () => {
    it('should by render with empty data array', () => {
        render(
            <Foot
                table={[]}
                entries={1}
                changePaginatedData={changePaginatedData}
            />
        )
        const footerText = screen.getByText(/Showing 0 to 0 of 0 entries/i)
        expect(paginatedData).toEqual([])
        expect(footerText).toBeInTheDocument()

        const paginateGroup = screen.getByTestId('paginateGroup')
        expect(paginateGroup.innerHTML).toEqual(
            '<button>Previous</button><button>Next</button>'
        )
    })

    it('should by renders with data array 10 entries', () => {
        render(
            <Foot
                table={testArray}
                entries={10}
                changePaginatedData={changePaginatedData}
            />
        )
        const footerText = screen.getByText(/Showing 1 to 3 of 3 entries/i)
        expect(paginatedData).toEqual(testArray)
        expect(footerText).toBeInTheDocument()

        const paginateGroup = screen.getByTestId('paginateGroup')
        expect(paginateGroup.innerHTML).toEqual(
            '<button>Previous</button><button class="current">1</button><button>Next</button>'
        )
    })

    it('should by renders with data array 1 entries', () => {
        render(
            <Foot
                table={testArray}
                entries={1}
                changePaginatedData={changePaginatedData}
            />
        )
        let footerText = screen.getByText(/Showing 1 to 1 of 3 entries/i)
        expect(paginatedData).toEqual([testArray[0]])
        expect(footerText).toBeInTheDocument()
        const paginateGroup = screen.getByTestId('paginateGroup')
        expect(paginateGroup.innerHTML).toEqual(
            '<button>Previous</button><button class="current">1</button><button class="">2</button><button>Next</button>'
        )

        // click events
        const nextButton = paginateGroup.lastChild
        const previousButton = paginateGroup.firstChild

        if (nextButton && previousButton) {
            fireEvent.click(previousButton)
            footerText = screen.getByText(/Showing 1 to 1 of 3 entries/i)
            expect(paginatedData).toEqual([testArray[0]])
            expect(footerText).toBeInTheDocument()

            fireEvent.click(nextButton)
            footerText = screen.getByText(/Showing 2 to 2 of 3 entries/i)
            expect(paginatedData).toEqual([testArray[1]])
            expect(footerText).toBeInTheDocument()

            fireEvent.click(nextButton)
            footerText = screen.getByText(/Showing 3 to 3 of 3 entries/i)
            expect(paginatedData).toEqual([testArray[2]])
            expect(footerText).toBeInTheDocument()

            fireEvent.click(nextButton)
            footerText = screen.getByText(/Showing 3 to 3 of 3 entries/i)
            expect(paginatedData).toEqual([testArray[2]])
            expect(footerText).toBeInTheDocument()

            fireEvent.click(previousButton)
            footerText = screen.getByText(/Showing 2 to 2 of 3 entries/i)
            expect(paginatedData).toEqual([testArray[1]])
            expect(footerText).toBeInTheDocument()
        } else expect(true).toBe(false) // fail test
    })
})
