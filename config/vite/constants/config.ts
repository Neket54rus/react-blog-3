import path from 'path'

export const BUILD_PATHS = {
    BUILD: path.resolve(process.cwd(), 'build'),
} as const

export const BUILD_DEFAULTS = {
    PORT: 3000,
} as const
