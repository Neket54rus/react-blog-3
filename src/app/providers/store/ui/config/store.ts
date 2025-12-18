import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit'
import type { NavigateOptions, To } from 'react-router'

import { userReducer } from 'entities/user'

import { $api } from 'shared/api/api'
import type { StateSchema } from 'shared/lib/store/state-schema'

import { createReducerManager } from './reducer-manager'

// Ref для хранения navigate функции
const navigateRef: {
    current: ((to: To, options?: NavigateOptions) => void) | undefined
} = {
    current: undefined,
}

// Функция-обертка для navigate, которая использует ref
const navigateWrapper = (to: To, options?: NavigateOptions): void => {
    if (navigateRef.current) {
        navigateRef.current(to, options)
    }
}

// Функция для установки navigate в ref
export const setNavigate = (
    navigate: (to: To, options?: NavigateOptions) => void,
): void => {
    navigateRef.current = navigate
}

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: Partial<ReducersMapObject<StateSchema>>,
): ReturnType<typeof configureStore<StateSchema>> => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
    }

    const reducerManager = createReducerManager(rootReducers)

    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                        navigate: navigateWrapper,
                    },
                },
            }),
    })

    // @ts-expect-error TODO
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
