import { type JSX } from 'react'

import { CollapsButton } from 'features/collaps-button'
import { LangSwitcher } from 'features/lang-switcher'
import { MainNavigation } from 'features/main-navigation'
import { ThemeSwitcher } from 'features/theme-switcher'

import { classNames } from 'shared/lib/class-names'
import { ToggleFeatures } from 'shared/lib/features'
import { AppLogo } from 'shared/ui/redesigned/app-logo'

import classes from './sidebar.module.scss'

interface SidebarProps {
    className?: string
    collapsed: boolean
    onToggle: () => void
}

export const Sidebar = (props: SidebarProps): JSX.Element => {
    const { className, collapsed, onToggle } = props

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
                    <AppLogo
                        className={classes.appLogo}
                        size={collapsed ? 30 : 60}
                    />
                    <MainNavigation short={collapsed} />
                    <CollapsButton onClick={onToggle} collapsed={collapsed} />
                    <div
                        className={classNames(classes.switchers, {
                            [classes.collapsed]: collapsed,
                        })}
                    >
                        <ThemeSwitcher />
                        <LangSwitcher />
                    </div>
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
/**
 * @deprecated
 */
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
