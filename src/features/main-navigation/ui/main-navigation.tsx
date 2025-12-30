import { memo, useMemo, type JSX } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { getUserAuthData } from 'entities/user'

import { classNames } from 'shared/lib/class-names'
import { Link, LinkTheme } from 'shared/ui/link'

import { mainNavigationItems } from '../model/config'

import classes from './main-navigation.module.scss'

interface MainNavigationProps {
    className?: string
    short?: boolean
}

export const MainNavigation = memo(
    (props: MainNavigationProps): JSX.Element => {
        const { className, short } = props

        const { t } = useTranslation()
        const authData = useSelector(getUserAuthData)

        const navigationItems = useMemo(
            () =>
                mainNavigationItems
                    .filter((item) => !item.authOnly || authData)
                    .map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            theme={LinkTheme.SECONDARY}
                        >
                            <div className={classes.mainNavigationItem}>
                                <item.Icon
                                    className={classes.mainNavigationItemIcon}
                                />
                                {!short && t(item.text)}
                            </div>
                        </Link>
                    )),
            [short, t, authData],
        )

        return (
            <div
                className={classNames(classes.mainNavigation, {}, [className])}
            >
                {navigationItems}
            </div>
        )
    },
)
