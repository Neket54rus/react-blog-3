export const IconTheme = {
    SECONDARY: 'secondary',
    INVERTED_SECONDARY: 'inverted_secondary',
} as const

export type IconTheme = (typeof IconTheme)[keyof typeof IconTheme]
