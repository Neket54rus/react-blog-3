import { type JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/class-names'
import { Link, LinkTheme } from 'shared/ui/link'

import { mainNavigationItems } from '../model/config'

import classes from './main-navigation.module.scss'

interface MainNavigationProps {
    className?: string
    short?: boolean
}

export const MainNavigation = (props: MainNavigationProps): JSX.Element => {
    const { className, short } = props

    const { t } = useTranslation()

    return (
        <div className={classNames(classes.mainNavigation, {}, [className])}>
            {mainNavigationItems.map((item) => (
                <Link key={item.to} to={item.to} theme={LinkTheme.SECONDARY}>
                    <div className={classes.mainNavigationItem}>
                        <item.Icon className={classes.mainNavigationItemIcon} />
                        {!short && t(item.text)}
                    </div>
                </Link>
            ))}
        </div>
    )
}
