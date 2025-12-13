import path from 'path'

export const BUILD_MODES = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
} as const

export const BUILD_DEFAULTS = {
    PORT: 3000,
    MODE: BUILD_MODES.DEVELOPMENT,
} as const

export const BUILD_PATHS = {
    ENTRY: path.resolve(process.cwd(), 'src', 'index.tsx'),
    BUILD: path.resolve(process.cwd(), 'build'),
    HTML: path.resolve(process.cwd(), 'public', 'index.html'),
    SRC: path.resolve(process.cwd(), 'src'),
} as const
