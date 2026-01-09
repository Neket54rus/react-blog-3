import type {
    Action,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import type { NavigateOptions, To } from 'react-router'

import type { ArticlesPageSchema } from 'pages/articles-page'

import type { AddCommentFormSchema } from 'features/add-comment-form'
import type { EditProfileSchema } from 'features/edit-profile'
import type { LoginSchema } from 'features/login-form'

import type { ArticleSchema } from 'entities/article'
import type { CommentsSchema } from 'entities/comment'
import type { ProfileSchema } from 'entities/profile'
import type { UserSchema } from 'entities/user'

export interface StateSchema {
    user: UserSchema
    loginForm?: LoginSchema
    profile?: ProfileSchema
    editProfile?: EditProfileSchema
    article?: ArticleSchema
    articleComments?: CommentsSchema
    addCommentForm?: AddCommentFormSchema
    articlesPage?: ArticlesPageSchema
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
