import type { Decorator } from '@storybook/react'
import { type JSX } from 'react'
import 'app/styles/index.scss'

export const StyleDecorator: Decorator = (Story): JSX.Element => <Story />
