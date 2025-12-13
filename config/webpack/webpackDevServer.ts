import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

import type { BuildOptions } from './types/config'

export const webpackDevServer = (
    options: BuildOptions,
): DevServerConfiguration => {
    const { port } = options

    return {
        port,
        open: false,
        historyApiFallback: true,
    }
}
