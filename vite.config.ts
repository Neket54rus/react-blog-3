import { defineConfig, loadEnv, type UserConfig } from 'vite'

import { BUILD_DEFAULTS, BUILD_PATHS } from './config/vite/constants/config'
import type {
    BuildEnv,
    BuildOptions,
    BuildPaths,
} from './config/vite/types/config'
import { viteConfig } from './config/vite/viteConfig'

const config = ({ mode }: { mode: string }): UserConfig => {
    const env = loadEnv(mode, process.cwd(), '') as BuildEnv

    const paths: BuildPaths = {
        build: BUILD_PATHS.BUILD,
    }
    const port = env.port || BUILD_DEFAULTS.PORT
    const apiUrl = env.apiUrl || BUILD_DEFAULTS.API

    const options: BuildOptions = {
        paths,
        port,
        apiUrl,
    }

    return defineConfig(viteConfig(options))
}

export default config
