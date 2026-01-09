import {
    type Action,
    combineReducers,
    type Reducer,
    type ReducersMapObject,
} from '@reduxjs/toolkit'

import type {
    MountedReducers,
    ReducerManager,
    StateSchema,
    StateSchemaKey,
} from 'shared/lib/store/state-schema'

export const createReducerManager = (
    initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager => {
    const reducers = { ...initialReducers }

    let combinedReducer: Reducer<StateSchema> = combineReducers(
        reducers as ReducersMapObject<StateSchema>,
    ) as Reducer<StateSchema>

    let keysToRemove: StateSchemaKey[] = []

    const mountedReducers: MountedReducers = {}

    return {
        getMountedReducers: () => mountedReducers,
        getReducerMap: (): ReducersMapObject<StateSchema> => reducers,
        reduce: (
            state: StateSchema | undefined,
            action: Action,
        ): StateSchema => {
            let newState: StateSchema | undefined = state
            if (keysToRemove.length > 0) {
                newState = { ...(state ?? {}) } as StateSchema
                for (const key of keysToRemove) {
                    delete newState[key]
                }
                keysToRemove = []
            }
            return combinedReducer(newState, action)
        },
        add: (key: StateSchemaKey, reducer: Reducer): void => {
            if (!key || reducers[key]) {
                return
            }
            reducers[key] = reducer
            mountedReducers[key] = true

            combinedReducer = combineReducers(
                reducers as ReducersMapObject<StateSchema>,
            ) as Reducer<StateSchema>
        },
        remove: (key: StateSchemaKey): void => {
            if (!key || !reducers[key]) {
                return
            }
            delete reducers[key]
            keysToRemove.push(key)
            mountedReducers[key] = false

            combinedReducer = combineReducers(
                reducers as ReducersMapObject<StateSchema>,
            ) as Reducer<StateSchema>
        },
    }
}
