import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type { WebpackPluginInstance } from 'webpack'
import { DefinePlugin, ProgressPlugin } from 'webpack'

import type { BuildOptions } from './types/config'

export const webpackPlugins = (
    options: BuildOptions,
): WebpackPluginInstance[] => {
    const { paths, isDev } = options

    return [
        new ProgressPlugin(),
        new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
    ]
}
