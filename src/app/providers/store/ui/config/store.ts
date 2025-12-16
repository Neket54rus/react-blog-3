import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit'

import { userReducer } from 'entities/user'

import type { StateSchema } from 'shared/lib/store/state-schema'

import { createReducerManager } from './reducer-manager'

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: Partial<ReducersMapObject<StateSchema>>,
): ReturnType<typeof configureStore<StateSchema>> => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
    }

    const reducerManager = createReducerManager(rootReducers)

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    })

    // @ts-expect-error TODO
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
