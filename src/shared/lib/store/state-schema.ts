import type {
    Action,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import type { NavigateOptions, To } from 'react-router'

import type { ArticlesPageSchema } from 'pages/articles-page'

import type { EditProfileSchema } from 'features/edit-profile'
import type { LoginSchema } from 'features/login-form'
import type { UISchema } from 'features/ui'

import type { ArticlePageSchema } from 'entities/article'
import type { ProfileSchema } from 'entities/profile'
import type { UserSchema } from 'entities/user'

export interface StateSchema {
    user: UserSchema
    UI: UISchema
    loginForm?: LoginSchema
    profile?: ProfileSchema
    editProfile?: EditProfileSchema
    articlesPage?: ArticlesPageSchema
    articlePage?: ArticlePageSchema
}

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
    getMountedReducers: () => MountedReducers
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema | undefined, action: Action) => StateSchema
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export type StateSchemaKey = keyof StateSchema
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance
    navigate: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}
