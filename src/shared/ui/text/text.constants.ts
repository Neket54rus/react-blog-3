export const ColorText = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    ERROR: 'error',
} as const

export type ColorText = (typeof ColorText)[keyof typeof ColorText]

export const SizeText = {
    M: 'size_m',
    L: 'size_l',
}

export type SizeText = (typeof SizeText)[keyof typeof SizeText]
