import { type JSX, useState } from 'react'

import { LangSwitcher } from 'features/lang-switcher'
import { MainNavigation } from 'features/main-navigation'
import { ThemeSwitcher } from 'features/theme-switcher'

import { classNames } from 'shared/lib/class-names'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/button'

import classes from './sidebar.module.scss'

interface SidebarProps {
    className?: string
}

export const Sidebar = (props: SidebarProps): JSX.Element => {
    const { className } = props

    const [collapsed, setCollapsed] = useState(false)

    const onToggle = (): void => {
        setCollapsed((prev) => !prev)
    }

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
            <Button
                data-testid="sidebar-toggle"
                className={classes.sidebarCollapseBtn}
                onClick={onToggle}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
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
