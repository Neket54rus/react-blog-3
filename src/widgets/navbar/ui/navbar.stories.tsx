import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { Navbar } from './navbar'

const meta: Meta<typeof Navbar> = {
    title: 'widgets/navbar',
    component: Navbar,
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
