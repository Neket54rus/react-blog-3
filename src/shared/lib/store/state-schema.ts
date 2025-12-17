import type {
    Action,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit'

import type { LoginSchema } from 'features/login-form'

import type { ProfileSchema } from 'entities/profile'
import type { UserSchema } from 'entities/user'

export interface StateSchema {
    user: UserSchema
    loginForm?: LoginSchema
    profile?: ProfileSchema
}

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema | undefined, action: Action) => StateSchema
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export type StateSchemaKey = keyof StateSchema
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}
