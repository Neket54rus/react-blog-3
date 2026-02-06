import type { Meta, StoryObj } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { Button } from './button'
import { ButtonSize, ButtonTheme } from './constants'

const meta: Meta<typeof Button> = {
    title: 'shared/button',
    component: Button,
    args: {
        children: 'Text',
    },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}

export const InvertedPrimary: Story = {
    args: {
        theme: ButtonTheme.CLEAR_INVERTED,
    },
}

export const InvertedPrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
    args: {
        theme: ButtonTheme.CLEAR_INVERTED,
    },
}

export const DisabletPrimary: Story = {
    args: {
        disabled: true,
    },
}

export const DisabledPrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
    args: {
        disabled: true,
    },
}

export const Outline: Story = {
    args: {
        theme: ButtonTheme.OUTLINE,
    },
}

export const OutlineDark: Story = {
    args: {
        theme: ButtonTheme.OUTLINE,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
}

export const BackgroundTheme: Story = {
    args: {
        theme: ButtonTheme.BACKGROUND,
    },
}

export const InvertedBackgroundTheme: Story = {
    args: {
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
}

export const Square: Story = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
    },
}

export const SquareSizeM: Story = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
        size: ButtonSize.M,
    },
}
export const SquareSizeL: Story = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
        size: ButtonSize.L,
    },
}
export const SquareSizeXl: Story = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
        size: ButtonSize.XL,
    },
}

export const SizeM: Story = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        size: ButtonSize.M,
    },
}
export const SizeL: Story = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        size: ButtonSize.L,
    },
}
export const SizeXl: Story = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        size: ButtonSize.XL,
    },
}
