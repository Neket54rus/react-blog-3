import { type StoryObj, type Meta } from '@storybook/react'
import { useState } from 'react'

import { StoreDecorator } from 'shared/config/storybook/store-decorator/store-decorator'
import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { LoginModal } from './login-modal'

const meta: Meta<typeof LoginModal> = {
    title: 'widgets/login-modal',
    component: LoginModal,
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setIsOpen] = useState(false)

        return (
            <>
                <button onClick={() => setIsOpen(true)}>
                    Открыть окно авторизации
                </button>
                <LoginModal
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            </>
        )
    },
    decorators: [
        StoreDecorator({
            loginForm: {
                username: 'admin',
                password: 'admin',
                isLoading: false,
            },
        }),
    ],
}

export default meta
type Story = StoryObj<typeof LoginModal>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
