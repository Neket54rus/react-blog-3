import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { MainNavigation } from './main-navigation'

const meta: Meta<typeof MainNavigation> = {
    title: 'fatures/main-navigation',
    component: MainNavigation,
}

export default meta
type Story = StoryObj<typeof MainNavigation>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
