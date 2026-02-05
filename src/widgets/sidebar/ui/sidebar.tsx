import { type JSX, useCallback, useState } from 'react'

import { CollapsButton } from 'features/collaps-button'
import { LangSwitcher } from 'features/lang-switcher'
import { MainNavigation } from 'features/main-navigation'
import { ThemeSwitcher } from 'features/theme-switcher'

import { classNames } from 'shared/lib/class-names'
import { ToggleFeatures } from 'shared/lib/features'
import { AppLogo } from 'shared/ui/deprecated/app-logo'

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <div
                    data-testid="sidebar"
                    className={classNames(
                        classes.sidebarRedesigned,
                        { [classes.collapsed]: collapsed },
                        [className],
                    )}
                >
                    <AppLogo className={classes.appLogo} />
                    <ThemeSwitcher />
                    <LangSwitcher />
                </div>
            }
            off={
                <DeprecatedSidebar
                    className={className}
                    collapsed={collapsed}
                    onToggle={onToggle}
                />
            }
        />
    )
}

interface DeprecatedSidebarProps {
    className?: string
    collapsed: boolean
    onToggle: () => void
}
const DeprecatedSidebar = (props: DeprecatedSidebarProps) => (
    <div
        data-testid="sidebar"
        className={classNames(
            classes.sidebar,
            { [classes.collapsed]: props.collapsed },
            [props.className],
        )}
    >
        <MainNavigation short={props.collapsed} />
        <CollapsButton
            className={classes.sidebarCollapseBtn}
            onClick={props.onToggle}
            collapsed={props.collapsed}
        />
        <div
            className={classNames(classes.sidebarSwithcers, {
                [classes.collapsed]: props.collapsed,
            })}
        >
            <ThemeSwitcher />
            <LangSwitcher />
        </div>
    </div>
)
