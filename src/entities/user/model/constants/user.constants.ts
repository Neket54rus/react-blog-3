export const USER_LOCAL_STORAGE_KEY = 'user'

export const UserRole = {
    ADMIN: 'ADMIN',
    USER: 'USER',
} as const
export type UserRole = (typeof UserRole)[keyof typeof UserRole]
