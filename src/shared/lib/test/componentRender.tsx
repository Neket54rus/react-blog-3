import { render } from '@testing-library/react'
import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router'

import { StoreProvider } from 'app/providers/store'

import i18nForTest from 'shared/config/i18n/i18n-for-test'
import { type StateSchema } from 'shared/lib/store/state-schema'

interface componentRenderOptions {
    route?: string
    initialState?: Partial<StateSchema>
}

export const componentRender = (
    component: ReactNode,
    options: componentRenderOptions = {},
): ReturnType<typeof render> => {
    const { route = '/', initialState } = options

    return render(
        <StoreProvider initialState={initialState as StateSchema}>
            <MemoryRouter initialEntries={[route]}>
                <I18nextProvider i18n={i18nForTest}>
                    {component}
                </I18nextProvider>
            </MemoryRouter>
        </StoreProvider>,
    )
}
