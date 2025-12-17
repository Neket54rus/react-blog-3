import { type JSX, useCallback, useState } from 'react'

import { CollapsButton } from 'features/collaps-button'
import { LangSwitcher } from 'features/lang-switcher'
import { MainNavigation } from 'features/main-navigation'
import { ThemeSwitcher } from 'features/theme-switcher'

import { classNames } from 'shared/lib/class-names'

import classes from './sidebar.module.scss'

interface SidebarProps {
    className?: string
}

export const Sidebar = (props: SidebarProps): JSX.Element => {
    const { className } = props

    const [collapsed, setCollapsed] = useState(false)

    const onToggle = useCallback((): void => {
        setCollapsed((prev) => !prev)
    }, [])

    return (
        <div
            data-testid="sidebar"
            className={classNames(
                classes.sidebar,
                { [classes.collapsed]: collapsed },
                [className],
            )}
        >
            <MainNavigation short={collapsed} />
            <CollapsButton
                className={classes.sidebarCollapseBtn}
                onClick={onToggle}
                collapsed={collapsed}
            />
            <div
                className={classNames(classes.sidebarSwithcers, {
                    [classes.collapsed]: collapsed,
                })}
            >
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        </div>
    )
}
