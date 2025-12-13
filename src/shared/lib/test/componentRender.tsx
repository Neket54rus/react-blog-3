import { render } from '@testing-library/react'
import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router'

import i18nForTest from 'shared/config/i18n/i18n-for-test'

interface componentRenderOptions {
    route?: string
}

export const componentRender = (
    component: ReactNode,
    options: componentRenderOptions = {},
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
    const { route = '/' } = options

    return render(
        <MemoryRouter initialEntries={[route]}>
            <I18nextProvider i18n={i18nForTest}>{component}</I18nextProvider>
        </MemoryRouter>,
    )
}
