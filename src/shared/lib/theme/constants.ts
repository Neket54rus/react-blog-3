import { Theme } from './types'

export const LOCAL_STORAGE_THEME_KEY = 'theme'

export const defaultTheme =
    (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT
