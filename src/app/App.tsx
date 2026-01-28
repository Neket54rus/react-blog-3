import { useEffect, type JSX } from 'react'

import { useUserActions } from 'entities/user'

import { AppRouter } from './ui/app-router'

export const App = (): JSX.Element => {
    const { initAuthData } = useUserActions()

    useEffect(() => {
        initAuthData()
    }, [initAuthData])

    return (
        <div className="app">
            <AppRouter />
        </div>
    )
}
