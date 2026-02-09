import { type StoryObj, type Meta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { Text } from './text'
import { ColorText, SizeText } from './text.constants'

const meta: Meta<typeof Text> = {
    title: 'shared/text',
    component: Text,
    args: {
        children: 'Text',
    },
}

export default meta
type Story = StoryObj<typeof Text>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}

export const Secondary: Story = {
    args: {
        color: ColorText.SECONDARY,
    },
}

export const SecondaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
    args: {
        color: ColorText.SECONDARY,
    },
}

export const Error: Story = {
    args: {
        color: ColorText.ERROR,
    },
}

export const ErrorDark: Story = {
    args: {
        color: ColorText.ERROR,
    },
}

export const SizeM: Story = {
    args: {
        size: SizeText.M,
    },
}

export const SizeL: Story = {
    args: {
        size: SizeText.L,
    },
}
