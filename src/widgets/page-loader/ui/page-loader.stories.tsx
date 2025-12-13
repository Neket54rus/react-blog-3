import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { PageLoader } from './page-loader'

const meta: Meta<typeof PageLoader> = {
    title: 'widgets/page-loader',
    component: PageLoader,
}

export default meta
type Story = StoryObj<typeof PageLoader>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
