import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { PageError } from './page-error'

const meta: Meta<typeof PageError> = {
    title: 'widgets/page-error',
    component: PageError,
}

export default meta
type Story = StoryObj<typeof PageError>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
