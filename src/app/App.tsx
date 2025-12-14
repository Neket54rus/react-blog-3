import { useEffect, type JSX } from 'react'
import { useDispatch } from 'react-redux'

import { userActions } from 'entities/user'

import { AppRouter } from './ui/app-router'

export const App = (): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])

    return (
        <div className="app">
            <AppRouter />
        </div>
    )
}
