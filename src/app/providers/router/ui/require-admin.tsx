import { type JSX } from 'react'
import { useSelector } from 'react-redux'

import { ForbiddenPage } from 'pages/forbidden-page'

import { isUserAdmin } from 'entities/user'

interface RequireAdminProps {
    children: JSX.Element
}

export const RequireAdmin = (props: RequireAdminProps): JSX.Element | null => {
    const { children } = props

    const isAdmin = useSelector(isUserAdmin)

    if (!isAdmin) {
        return <ForbiddenPage />
    }

    return children
}
