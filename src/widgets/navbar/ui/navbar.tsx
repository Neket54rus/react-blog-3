import { type JSX } from 'react'

import { useUserAuthData } from 'entities/user'

import { NavbarWithAuthorization } from './navbar-with-authorization'
import { NavbarWithoutAuthorization } from './navbar-without-authorization'

interface NavbarProps {
    className?: string
}

export const Navbar = (props: NavbarProps): JSX.Element => {
    const { className } = props

    const authData = useUserAuthData()

    return authData ? (
        <NavbarWithAuthorization className={className} />
    ) : (
        <NavbarWithoutAuthorization className={className} />
    )
}
