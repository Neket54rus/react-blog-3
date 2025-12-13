import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import NotFoundPage from './not-found-page'

const meta: Meta<typeof NotFoundPage> = {
    title: 'pages/not-found-page',
    component: NotFoundPage,
}

export default meta
type Story = StoryObj<typeof NotFoundPage>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
