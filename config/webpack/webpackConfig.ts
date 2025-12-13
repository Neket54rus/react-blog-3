import type { Configuration } from 'webpack'

import type { BuildOptions } from './types/config'
import { webpackDevServer } from './webpackDevServer'
import { webpackPlugins } from './webpackPlugins'
import { webpackRules } from './webpackRules'

export const webpackConfig = (options: BuildOptions): Configuration => {
    const { mode, paths, isDev } = options
    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
        },
        plugins: webpackPlugins(options),
        module: {
            rules: webpackRules(options),
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            preferAbsolute: true,
            modules: [paths.src, 'node_modules'],
            mainFiles: ['index'],
            alias: {},
        },
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? webpackDevServer(options) : undefined,
    }
}
