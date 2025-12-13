import type { JSX, ReactNode } from 'react'
import { MemoryRouter } from 'react-router'

interface renderWithRouterOptions {
    route: string
}

export const renderWithRouter = (
    component: ReactNode,
    options: renderWithRouterOptions,
): JSX.Element => {
    const { route } = options

    return (
        <MemoryRouter initialEntries={[{ pathname: route }]}>
            {component}
        </MemoryRouter>
    )
}
