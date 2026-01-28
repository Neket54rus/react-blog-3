import { useSelector } from 'react-redux'

import { type StateSchema } from './state-schema'

type Selector<T> = (state: StateSchema) => T
type Result<T> = [() => T, Selector<T>]

export const buildSelector = <T>(selector: Selector<T>): Result<T> => {
    const useSelectorHook = (): T => useSelector(selector)

    return [useSelectorHook, selector]
}
