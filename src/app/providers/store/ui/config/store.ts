import { configureStore } from '@reduxjs/toolkit'

import { type StateSchema } from './state-schema'

export const createReduxStore = (
    initialState?: StateSchema,
): ReturnType<typeof configureStore> =>
    configureStore<StateSchema>({
        reducer: {},
        devTools: __IS_DEV__,
        preloadedState: initialState,
    })
