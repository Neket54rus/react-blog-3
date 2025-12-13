import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import AboutPage from './AboutPage'

const meta: Meta<typeof AboutPage> = {
    title: 'pages/about-page',
    component: AboutPage,
}

export default meta
type Story = StoryObj<typeof AboutPage>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
