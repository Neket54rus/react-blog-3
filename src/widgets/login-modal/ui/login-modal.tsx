import { type JSX } from 'react'

import { LoginForm } from 'features/login-form'

import { Modal } from 'shared/ui/modal/modal'

interface LoginFormProps {
    isOpen: boolean
    onClose: () => void
    className?: string
}

export const LoginModal = (props: LoginFormProps): JSX.Element => {
    const { isOpen, onClose, className } = props

    return (
        <Modal className={className} isOpen={isOpen} onClose={onClose} lazy>
            <LoginForm />
        </Modal>
    )
}
