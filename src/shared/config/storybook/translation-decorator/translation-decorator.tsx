import { type Decorator } from '@storybook/react'
import { type JSX } from 'react'
import { I18nextProvider } from 'react-i18next'

import i18n from 'shared/config/i18n/i18n'

export const TranslationDecorator: Decorator = (Story): JSX.Element => (
    <I18nextProvider i18n={i18n}>
        <Story />
    </I18nextProvider>
)
