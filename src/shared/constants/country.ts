export const Country = {
    RUSSIA: 'Russia',
    BELARUS: 'Belarus',
    UKRAINE: 'Ukraine',
    KAZAHSTAN: 'Kazahstan',
    ARMENIA: 'Armenia',
} as const

export type Country = (typeof Country)[keyof typeof Country]
