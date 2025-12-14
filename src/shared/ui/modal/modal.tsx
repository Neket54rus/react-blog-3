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
    lazy?: boolean
}

export const Modal = (props: ModalProps): JSX.Element | null => {
    const { children, isOpen = false, onClose, className, lazy } = props

    const [isOpened, setIsOpened] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [isMounded, setIsMounted] = useState(false)
    const openedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const closingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const closeHandler = useCallback((): void => {
        if (onClose) {
            setIsClosing(true)
            closingTimerRef.current = setTimeout(() => {
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
            setIsMounted(true)
            openedTimerRef.current = setTimeout(() => {
                setIsOpened(true)
            })
        } else {
            setIsMounted(false)
            setIsOpened(false)
        }
    }, [isOpen])

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
            if (closingTimerRef.current) {
                clearTimeout(closingTimerRef.current)
                closingTimerRef.current = null
            }

            if (openedTimerRef.current) {
                clearTimeout(openedTimerRef.current)
                openedTimerRef.current = null
            }
        },
        [],
    )

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
