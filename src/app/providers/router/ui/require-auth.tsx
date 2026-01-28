import { type JSX } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

import { getUserInited, useUserAuthData } from 'entities/user'

import { getRouteMain } from 'shared/routes/constants'

interface RequireAuthProps {
    children: JSX.Element
}

export const RequireAuth = (props: RequireAuthProps): JSX.Element | null => {
    const { children } = props

    const authData = useUserAuthData()
    const isInited = useSelector(getUserInited)

    if (!isInited) {
        return null
    }

    if (!authData) {
        return <Navigate to={getRouteMain()} replace />
    }

    return children
}
