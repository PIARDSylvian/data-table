export interface Data {
    [key: string]: string
}

export interface Filter {
    filter: string
    order: string
}

export interface InitialState {
    filters: Filter
    entries: number
    search: string
    data: Data[]
}

export interface Option {
    select?: string[] | null
    head?: (string | null)[] | null
}
