# info

Created for openclassroom project, build with react, javascript & typescript.
tested with jest. 

# installation

```npm i react-data-table-oc```

# How to use

```
import ReactDataTable from 'react-data-table-oc'

< ReactDataTable data={mydata} />
```

# how to set option

```
const myOption = {}

< ReactDataTable data={mydata} option={myOption}/
```

#### modify entry number
by default data-table shwo 10 entries and with select 25 - 50 - 100
you can modify this with option.select

```
const option = {
    select : [ 5, 10 ] 
}
```

#### modify column naming
by default data-table get index of array ( or object ) for
column naming. null or empty string equal no change.

```
// change only first and second column

const option = {
    head : [
        'first column',
        null
        'third column'
    ] 
}
```