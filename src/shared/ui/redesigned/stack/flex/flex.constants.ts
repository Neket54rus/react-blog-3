export const FlexJustify = {
    START: 'start',
    END: 'end',
    CENTER: 'center',
    BETWEEN: 'between',
} as const

export type FlexJustify = (typeof FlexJustify)[keyof typeof FlexJustify]

export const FlexAlign = {
    START: 'start',
    END: 'end',
    CENTER: 'center',
} as const

export type FlexAlign = (typeof FlexAlign)[keyof typeof FlexAlign]

export const FlexDirection = {
    ROW: 'row',
    COLUMN: 'column',
} as const

export type FlexDirection = (typeof FlexDirection)[keyof typeof FlexDirection]
