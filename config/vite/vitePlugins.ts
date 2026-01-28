import react from '@vitejs/plugin-react'
import removeAttr from 'remove-attr'
import type { PluginOption } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export const vitePlugins = (): PluginOption[] => [
    react(),
    tsconfigPaths(),
    svgr({
        svgrOptions: {
            exportType: 'default',
            ref: true,
            svgo: false,
            titleProp: true,
        },
        include: '**/*.svg?react',
    }),
    removeAttr({
        extensions: ['ts', 'tsx'],
        attributes: ['data-testid'],
    }),
]
