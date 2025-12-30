export const ValidatePorfileError = {
    INCORRECT_USER_DATA: 'INCORRECT_USER_DATA',
    NO_DATA: 'NO_DATA',
    SERVER_ERROR: 'SERVER_ERROR',
} as const

export type ValidatePorfileError =
    (typeof ValidatePorfileError)[keyof typeof ValidatePorfileError]
