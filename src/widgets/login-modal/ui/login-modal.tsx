import { Suspense, type JSX } from 'react'

import { LoginForm } from 'features/login-form'

import { Modal } from 'shared/ui/deprecated/modal/modal'
import { Spinner } from 'shared/ui/deprecated/spinner'

interface LoginFormProps {
    isOpen: boolean
    onClose: () => void
    className?: string
}

export const LoginModal = (props: LoginFormProps): JSX.Element => {
    const { isOpen, onClose, className } = props

    return (
        <Modal className={className} isOpen={isOpen} onClose={onClose} lazy>
            <Suspense fallback={<Spinner />}>
                <LoginForm />
            </Suspense>
        </Modal>
    )
}
