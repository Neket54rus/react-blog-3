import { useContext } from 'react'

import { LOCAL_STORAGE_THEME_KEY } from './constants'
import { ThemeContext } from './theme-context'
import { Theme } from './types'

interface UseThemeResult {
    toggleTheme: () => void
    theme: Theme
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext)

    document.body.className = theme || Theme.LIGHT

    const toggleTheme = (): void => {
        if (setTheme) {
            const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
            setTheme(newTheme)
            document.body.className = newTheme
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
        }
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    }
}
