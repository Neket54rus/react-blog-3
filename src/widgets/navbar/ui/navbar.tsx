import { type JSX } from 'react'
import { useSelector } from 'react-redux'

import { getUserAuthData } from 'entities/user'

import { NavbarWithAuthorization } from './navbar-with-authorization'
import { NavbarWithoutAuthorization } from './navbar-without-authorization'

interface NavbarProps {
    className?: string
}

export const Navbar = (props: NavbarProps): JSX.Element => {
    const { className } = props

    const authData = useSelector(getUserAuthData)

    return authData ? (
        <NavbarWithAuthorization className={className} />
    ) : (
        <NavbarWithoutAuthorization className={className} />
    )
}
