import type { JSX } from 'react'
import type { NavLinkProps } from 'react-router'
import { NavLink } from 'react-router'

import { classNames } from 'shared/lib/class-names'

import classes from './link.module.scss'

interface LinkProps extends Omit<NavLinkProps, 'className'> {
    variant?: 'red'
    className?: string
}

export const Link = (props: LinkProps): JSX.Element => {
    const { children, className, variant, ...otherProps } = props

    return (
        <NavLink
            className={({ isActive }) =>
                classNames(
                    classes.link,
                    {
                        [classes.active]: isActive,
                    },
                    [className, variant && classes[variant]],
                )
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    )
}
