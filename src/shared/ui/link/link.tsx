import type { JSX } from 'react'
import type { LinkProps as ReactRouterLinkProps } from 'react-router'
import { Link as ReactRouterLink } from 'react-router'

import { classNames } from 'shared/lib/class-names'

import { LinkTheme } from './constants'
import classes from './link.module.scss'

interface LinkProps extends ReactRouterLinkProps {
    theme?: LinkTheme
}

export const Link = (props: LinkProps): JSX.Element => {
    const {
        children,
        className,
        theme = LinkTheme.PRIMARY,
        ...otherProps
    } = props

    return (
        <ReactRouterLink
            className={classNames(classes.link, {}, [
                className,
                classes[theme],
            ])}
            {...otherProps}
        >
            {children}
        </ReactRouterLink>
    )
}
