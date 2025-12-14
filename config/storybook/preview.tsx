import type { Preview } from '@storybook/react-vite'

import { RouterDecorator } from '../../src/shared/config/storybook/router-decorator/router-decorator'
import { StyleDecorator } from '../../src/shared/config/storybook/style-decorator/style-decorator'
import { ThemeDecorator } from '../../src/shared/config/storybook/theme-decorator/theme-decorator'
import { TranslationDecorator } from '../../src/shared/config/storybook/translation-decorator/translation-decorator'
import { Theme } from '../../src/shared/lib/theme'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        TranslationDecorator,
        StyleDecorator,
        ThemeDecorator(Theme.LIGHT),
        RouterDecorator,
    ],
}

export default preview
