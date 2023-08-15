import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactDataTable from './lib'

const data = [
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

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
    <React.StrictMode>
        <ReactDataTable data={data} />
    </React.StrictMode>
)
