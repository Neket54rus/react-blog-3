import {
    type ReactNode,
    type JSX,
    type MouseEvent,
    useEffect,
    useCallback,
    useState,
    useRef,
} from 'react'

import { classNames } from 'shared/lib/class-names'

import { Portal } from '../portal/portal'

import classes from './modal.module.scss'

interface ModalProps {
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    className?: string
}

export const Modal = (props: ModalProps): JSX.Element => {
    const { children, isOpen = false, onClose, className } = props

    const [isClosing, setIsClosing] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const closeHandler = useCallback((): void => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, 300)
        }
    }, [onClose])

    const handlerEscKey = useCallback(
        (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                closeHandler()
            }
        },
        [closeHandler],
    )

    const onContentClick = (event: MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation()
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.addEventListener('keydown', handlerEscKey)
        }
        return (): void => {
            document.body.style.overflow = 'auto'
            document.removeEventListener('keydown', handlerEscKey)
        }
    }, [isOpen, handlerEscKey])

    useEffect(
        () => (): void => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = null
            }
        },
        [],
    )

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
                            [classes.opened]: isOpen,
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
