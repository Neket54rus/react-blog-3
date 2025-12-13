import type { Configuration } from 'webpack'

import {
    BUILD_DEFAULTS,
    BUILD_MODES,
    BUILD_PATHS,
} from './config/webpack/const/config.constants'
import type {
    BuildEnv,
    BuildMode,
    BuildOptions,
    BuildPaths,
} from './config/webpack/types/config'
import { webpackConfig } from './config/webpack/webpackConfig'

const config = (env: BuildEnv): Configuration => {
    const paths: BuildPaths = {
        build: BUILD_PATHS.BUILD,
        entry: BUILD_PATHS.ENTRY,
        html: BUILD_PATHS.HTML,
        src: BUILD_PATHS.SRC,
    }

    const mode: BuildMode = env.mode || BUILD_DEFAULTS.MODE

    const isDev = mode === BUILD_MODES.DEVELOPMENT

    const port = env.port || BUILD_DEFAULTS.PORT

    const options: BuildOptions = {
        mode,
        paths,
        isDev,
        port,
    }

    return webpackConfig(options)
}

export default (env: BuildEnv): Configuration => config(env)
