import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type { RuleSetRule } from 'webpack'

import type { BuildOptions } from './types/config'

export const webpackRules = (options: BuildOptions): RuleSetRule[] => {
    const { isDev } = options

    const typescriptRules = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const sassRules = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        namedExport: false,
                        auto: /\.module\./i,
                        localIdentName: isDev
                            ? '[path][name]__[local]'
                            : '[hash:base64:8]',
                    },
                },
            },
            'sass-loader',
        ],
    }

    const svgRules = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    }

    const fileRules = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: ['file-loader'],
    }

    const babelRules = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
        },
    }

    return [fileRules, svgRules, babelRules, typescriptRules, sassRules]
}
