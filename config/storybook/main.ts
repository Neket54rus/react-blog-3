import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

const config: StorybookConfig = {
    stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@chromatic-com/storybook',
        '@storybook/addon-vitest',
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
    ],
    framework: '@storybook/react-vite',
    viteFinal: async (config) =>
        mergeConfig(config, {
            plugins: [
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
            ],
            define: {
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify(''),
                __PROJECT__: JSON.stringify('storybook'),
            },
        }),
}
export default config
