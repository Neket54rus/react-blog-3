import { type ReactNode, type JSX } from 'react'

import { classNames } from 'shared/lib/class-names'
import { useModal } from 'shared/lib/hooks/use-modal/use-modal'

import { Portal } from '../portal/portal'

import classes from './modal.module.scss'

interface ModalProps {
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    className?: string
    lazy?: boolean
}

export const Modal = (props: ModalProps): JSX.Element | null => {
    const { children, isOpen = false, onClose, className, lazy } = props

    const { isClosing, isMounded, isOpened, onContentClick, closeHandler } =
        useModal({
            isOpen,
            onClose,
        })

    if (!isMounded && lazy) {
        return null
    }

    return (
        <Portal>
            <div
                className={classNames(
                    classes.modal,
                    { [classes.opened]: isOpen },
                    [className],
                )}
            >
                <div className={classes.modalOverlay} onClick={closeHandler}>
                    <div
                        className={classNames(classes.modalContent, {
                            [classes.opened]: isOpened,
                            [classes.closing]: isClosing,
                        })}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
