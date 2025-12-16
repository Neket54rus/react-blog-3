import { type Action, type ReducersMapObject } from '@reduxjs/toolkit'
import { type Decorator } from '@storybook/react'
import { type Reducer, type JSX } from 'react'

import { StoreProvider } from 'app/providers/store'

import { loginReducer, type LoginSchema } from 'features/login-form'

import { type StateSchema } from 'shared/lib/store/state-schema'

const defaultAsyncReducers: Partial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer as Reducer<LoginSchema | undefined, Action>,
}

export const StoreDecorator =
    (
        state: Partial<StateSchema>,
        asyncReducers?: Partial<ReducersMapObject<StateSchema>>,
    ): Decorator =>
    (Story): JSX.Element => (
        <StoreProvider
            initialState={state as StateSchema}
            asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
        >
            <Story />
        </StoreProvider>
    )
