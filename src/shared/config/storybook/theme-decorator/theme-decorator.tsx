import { type Decorator } from '@storybook/react'
import { type JSX } from 'react'

import { type Theme } from '../../../lib/theme'

export const ThemeDecorator =
    (theme: Theme): Decorator =>
    (Story): JSX.Element => {
        document.body.className = theme

        return <Story />
    }
