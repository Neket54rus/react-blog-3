import { memo, type JSX } from 'react'

import darkIconDeprecated from 'shared/assets/icons/deprecated/theme-dark.svg'
import lightIconDeprecated from 'shared/assets/icons/deprecated/theme-light.svg'
import ThemeIcon from 'shared/assets/icons/theme.svg?react'
import { classNames } from 'shared/lib/class-names'
import { ToggleFeatures } from 'shared/lib/features'
import { Theme, useTheme } from 'shared/lib/theme'
import { Button as ButtonDeprecated } from 'shared/ui/deprecated/button'
import { Button } from 'shared/ui/redesigned/button'

import classes from './theme-switcher.module.scss'

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps): JSX.Element => {
    const { className } = props

    const { theme, toggleTheme } = useTheme()

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Button
                    className={classNames(classes.themeSwitcher, {}, [
                        className,
                    ])}
                    onClick={toggleTheme}
                >
                    <ThemeIcon />
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={classNames(classes.themeSwitcher, {}, [
                        className,
                    ])}
                    onClick={toggleTheme}
                >
                    {theme === Theme.DARK ? (
                        <img src={darkIconDeprecated} alt="theme switcher" />
                    ) : (
                        <img src={lightIconDeprecated} alt="theme switcher" />
                    )}
                </ButtonDeprecated>
            }
        />
    )
})
