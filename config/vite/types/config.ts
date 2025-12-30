import { BUILD_PROJECT } from '../constants/config'

export type BuildProject = (typeof BUILD_PROJECT)[keyof typeof BUILD_PROJECT]

export interface BuildPaths {
    build: string
}

export interface BuildOptions {
    paths: BuildPaths
    port: number
    apiUrl: string
    project: BuildProject
}

export interface BuildEnv {
    port?: number
    apiUrl?: string
}
