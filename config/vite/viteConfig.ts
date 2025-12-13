import type { UserConfig } from 'vite'

import type { BuildOptions } from './types/config'
import { vitePlugins } from './vitePlugins'

export const viteConfig = (options: BuildOptions): UserConfig => {
    const { paths, port } = options

    return {
        plugins: vitePlugins(),
        server: {
            port,
            open: false,
            hmr: true,
        },
        build: {
            outDir: paths.build,
            sourcemap: true,
            target: 'esnext',
        },
        resolve: {
            alias: {
                '*': './src/*',
            },
        },
        define: {
            __IS_DEV__: JSON.stringify(true),
        },
    }
}
