import { type ReducersMapObject } from '@reduxjs/toolkit'
import { type JSX, type ReactNode, useMemo } from 'react'
import { Provider } from 'react-redux'

import type { StateSchema } from 'shared/lib/store/state-schema'

import { createReduxStore } from './config/store'

interface StoreProviderProps {
    children: ReactNode
    initialState?: StateSchema
    asyncReducers?: Partial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps): JSX.Element => {
    const { children, initialState, asyncReducers } = props

    const store = useMemo(
        () => createReduxStore(initialState, asyncReducers),
        [initialState, asyncReducers],
    )

    return <Provider store={store}>{children}</Provider>
}
