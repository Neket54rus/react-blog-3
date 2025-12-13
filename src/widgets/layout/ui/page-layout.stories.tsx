import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { PageLayout } from './page-layout'

const meta: Meta<typeof PageLayout> = {
    title: 'widgets/page-layout',
    component: PageLayout,
}

export default meta
type Story = StoryObj<typeof PageLayout>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
