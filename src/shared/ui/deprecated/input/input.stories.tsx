import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { Input } from './input'

const meta: Meta<typeof Input> = {
    title: 'shared/input',
    component: Input,
    args: {
        placeholder: 'Введите текст',
    },
}

export default meta
type Story = StoryObj<typeof Input>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}

export const AutofocusPrimary: Story = {
    args: {
        autofocus: true,
    },
}

export const AutofocusPrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
    args: {
        autofocus: true,
    },
}
