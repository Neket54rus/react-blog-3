import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { LoginForm } from './login-form'

const meta: Meta<typeof LoginForm> = {
    title: 'features/login-form',
    component: LoginForm,
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
