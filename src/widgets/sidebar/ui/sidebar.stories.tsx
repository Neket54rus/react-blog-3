import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { Sidebar } from './sidebar'

const meta: Meta<typeof Sidebar> = {
    title: 'widgets/sidebar',
    component: Sidebar,
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
