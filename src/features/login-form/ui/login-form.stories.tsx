import { type StoryObj, type Meta } from '@storybook/react'

import { StoreDecorator } from 'shared/config/storybook/store-decorator/store-decorator'
import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { LoginForm } from './login-form'

const meta: Meta<typeof LoginForm> = {
    title: 'features/login-form',
    component: LoginForm,
    decorators: [
        StoreDecorator({
            loginForm: {
                username: 'admin',
                password: 'admin',
                isLoading: false,
            },
        }),
    ],
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}

export const PrimaryWithError: Story = {
    decorators: [
        StoreDecorator({
            loginForm: {
                username: 'admin',
                password: 'admin',
                isLoading: false,
                error: 'Вы ввели неверный логин или пароль!',
            },
        }),
    ],
}

export const LoadingPrimary: Story = {
    decorators: [
        StoreDecorator({
            loginForm: {
                username: 'admin',
                password: 'admin',
                isLoading: true,
            },
        }),
    ],
}
