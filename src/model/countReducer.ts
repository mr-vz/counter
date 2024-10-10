let valueCountFromLS = localStorage.getItem("count")
    let lsCount
    if (valueCountFromLS) {
        lsCount = JSON.parse(valueCountFromLS)
    }

export type initialType = {
    count: number
    max: number
    start: number
}

const initialState: initialType = {
    count: lsCount || 0,
    max: 5,
    start: 0
}

export const countReducer = (state: initialType  = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'RESET_COUNT': {
            return {...state, count:  action.payload.value}
        }
        case 'INCREMENT_COUNT': {
            return {...state, count: action.payload.value + 1}
        }
        case 'UPDATE_START': {
            return {...state, start: action.payload.value}
        }
        case 'UPDATE_MAX': {
            return {...state, max: action.payload.value}
        }
        default:
            return state
    }
}

//action creators
export const resetCounterAC = (value: number) => {
    return { type: 'RESET_COUNT', payload: {value}} as const
}

export const incrementCounterAC = (value: number) => {
    return { type: 'INCREMENT_COUNT', payload: {value}} as const
}

export const updateStartAC = (value: number) => {
    return { type: 'UPDATE_START', payload: {value}} as const
}

export const updateMaxAC = (value: number) => {
    return { type: 'UPDATE_MAX', payload: {value}} as const
}

//action types
export type ResetCountActionType = ReturnType<typeof resetCounterAC>
export type IncrementCountActionType = ReturnType<typeof incrementCounterAC>
export type UpdateStartActionType = ReturnType<typeof updateStartAC>
export type UpdateMaxActionType = ReturnType<typeof updateMaxAC>

type ActionsType =
    | ResetCountActionType
    | IncrementCountActionType
    | UpdateStartActionType
    | UpdateMaxActionType