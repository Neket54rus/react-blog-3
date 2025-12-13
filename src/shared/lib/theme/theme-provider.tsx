import type { JSX, ReactNode } from 'react'
import { useMemo, useState } from 'react'

import { defaultTheme } from './constants'
import { ThemeContext } from './theme-context'
import type { Theme } from './types'

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider = (props: ThemeProviderProps): JSX.Element => {
    const { children } = props

    const [theme, setTheme] = useState<Theme>(defaultTheme)

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    )

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}
