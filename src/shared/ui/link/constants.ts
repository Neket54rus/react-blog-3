export const LinkTheme = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
} as const

export type LinkTheme = (typeof LinkTheme)[keyof typeof LinkTheme]
