import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { ThemeSwitcher } from './theme-switcher'

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'fatures/theme-switcher',
    component: ThemeSwitcher,
}

export default meta
type Story = StoryObj<typeof ThemeSwitcher>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
