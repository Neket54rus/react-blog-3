import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { Spinner } from './spinner'

const meta: Meta<typeof Spinner> = {
    title: 'shared/spinner',
    component: Spinner,
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
