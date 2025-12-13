import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import MainPage from './MainPage'

const meta: Meta<typeof MainPage> = {
    title: 'pages/main-page',
    component: MainPage,
}

export default meta
type Story = StoryObj<typeof MainPage>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
