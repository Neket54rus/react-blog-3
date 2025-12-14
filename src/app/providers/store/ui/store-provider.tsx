import { type JSX, type ReactNode } from 'react'
import { Provider } from 'react-redux'

import type { StateSchema } from 'shared/lib/store/state-schema'

import { createReduxStore } from './config/store'

interface StoreProviderProps {
    children: ReactNode
    initialState?: StateSchema
}

export const StoreProvider = (props: StoreProviderProps): JSX.Element => {
    const { children, initialState } = props

    const store = createReduxStore(initialState)

    return <Provider store={store}>{children}</Provider>
}
