import { type JSX } from 'react'

import { AppRouter } from './ui/app-router'

export const App = (): JSX.Element => (
    <div className="app">
        <AppRouter />
    </div>
)
