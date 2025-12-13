import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { LangSwitcher } from './lang-switcher'

const meta: Meta<typeof LangSwitcher> = {
    title: 'fatures/lang-switcher',
    component: LangSwitcher,
}

export default meta
type Story = StoryObj<typeof LangSwitcher>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
