export interface BuildPaths {
    build: string
}

export interface BuildOptions {
    paths: BuildPaths
    port: number
}

export interface BuildEnv {
    port?: number
}
