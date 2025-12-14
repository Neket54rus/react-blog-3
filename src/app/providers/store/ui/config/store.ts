import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from 'entities/user'

import { type StateSchema } from './state-schema'

export const createReduxStore = (
    initialState?: StateSchema,
): ReturnType<typeof configureStore> =>
    configureStore<StateSchema>({
        reducer: {
            user: userReducer,
        },
        devTools: __IS_DEV__,
        preloadedState: initialState,
    })
