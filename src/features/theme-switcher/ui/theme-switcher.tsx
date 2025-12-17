import { memo, type JSX } from 'react'

import darkIcon from 'shared/assets/icons/theme-dark.svg'
import lightIcon from 'shared/assets/icons/theme-light.svg'
import { classNames } from 'shared/lib/class-names'
import { Theme, useTheme } from 'shared/lib/theme'
import { Button } from 'shared/ui/button'

import classes from './theme-switcher.module.scss'

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps): JSX.Element => {
    const { className } = props

    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            className={classNames(classes.themeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? (
                <img src={darkIcon} alt="theme switcher" />
            ) : (
                <img src={lightIcon} alt="theme switcher" />
            )}
        </Button>
    )
})
