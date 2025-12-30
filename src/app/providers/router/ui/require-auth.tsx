import { type JSX } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

import { getUserAuthData, getUserInited } from 'entities/user'

import { RoutePath } from 'shared/routes'

interface RequireAuthProps {
    children: JSX.Element
}

export const RequireAuth = (props: RequireAuthProps): JSX.Element | null => {
    const { children } = props

    const authData = useSelector(getUserAuthData)
    const isInited = useSelector(getUserInited)

    if (!isInited) {
        return null
    }

    if (!authData) {
        return <Navigate to={RoutePath.main} replace />
    }

    return children
}
