import { type Decorator } from '@storybook/react'
import { type JSX } from 'react'

import { StoreProvider } from 'app/providers/store'

import { type StateSchema } from 'shared/lib/store/state-schema'

export const StoreDecorator =
    (state: Partial<StateSchema>): Decorator =>
    (Story): JSX.Element => (
        <StoreProvider initialState={state as StateSchema}>
            <Story />
        </StoreProvider>
    )
