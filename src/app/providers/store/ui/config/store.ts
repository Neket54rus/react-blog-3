import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit'

import { loginReducer } from 'features/login-form'

import { userReducer } from 'entities/user'

import type { StateSchema } from 'shared/lib/store/state-schema'

export const createReduxStore = (
    initialState?: StateSchema,
): ReturnType<typeof configureStore> => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        loginForm: loginReducer,
    }

    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    })
}
