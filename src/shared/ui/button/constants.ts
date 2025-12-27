export const ButtonTheme = {
    CLEAR: 'clear',
    CLEAR_INVERTED: 'clear_inverted',
    OUTLINE: 'outline',
    BACKGROUND: 'background',
    BACKGROUND_INVERTED: 'background_inverted',
    RED: 'red',
} as const

export type ButtonTheme = (typeof ButtonTheme)[keyof typeof ButtonTheme]

export const ButtonSize = {
    M: 'size_m',
    L: 'size_l',
    XL: 'size_xl',
} as const

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize]
