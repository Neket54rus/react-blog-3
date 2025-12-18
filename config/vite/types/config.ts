export interface BuildPaths {
    build: string
}

export interface BuildOptions {
    paths: BuildPaths
    port: number
    apiUrl: string
}

export interface BuildEnv {
    port?: number
    apiUrl?: string
}
