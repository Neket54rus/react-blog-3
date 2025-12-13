import type { BUILD_MODES } from '../const/config.constants'

export type BuildMode = (typeof BUILD_MODES)[keyof typeof BUILD_MODES]

export interface BuildPaths {
    entry: string
    build: string
    html: string
    src: string
}

export interface BuildOptions {
    mode: BuildMode
    paths: BuildPaths
    isDev: boolean
    port: number
}

export interface BuildEnv {
    mode: BuildMode
    port: number
}
