import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { ThemeDecorator } from 'shared/config/storybook/theme-decorator/theme-decorator'
import { Theme } from 'shared/lib/theme'

import { Modal } from './modal'

const meta: Meta<typeof Modal> = {
    title: 'shared/modal',
    component: Modal,
    args: {
        children: 'Text',
    },
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [open, setOpen] = useState(false)

        return (
            <>
                <button onClick={() => setOpen(true)}>
                    Открыть модальное окно
                </button>
                <Modal {...args} isOpen={open} onClose={() => setOpen(false)}>
                    {args.children}
                </Modal>
            </>
        )
    },
}

export default meta
type Story = StoryObj<typeof Modal>

export const Primary: Story = {}

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
