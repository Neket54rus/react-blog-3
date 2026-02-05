import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { LinkTheme } from './constants'
import { Link } from './link'

const meta: Meta<typeof Link> = {
    title: 'shared/link',
    component: Link,
    args: {
        children: 'Link',
    },
}

export default meta
type Story = StoryObj<typeof Link>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}

export const Secondary: Story = {
    args: {
        theme: LinkTheme.SECONDARY,
    },
}

export const SecondaryDark: Story = {
    args: {
        theme: LinkTheme.SECONDARY,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
}
