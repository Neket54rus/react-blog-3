import {
    type MouseEvent,
    useEffect,
    useCallback,
    useState,
    useRef,
} from 'react'

interface UseModalReturn {
    isOpened: boolean
    isClosing: boolean
    isMounded: boolean
    onContentClick: (event: MouseEvent<HTMLDivElement>) => void
    closeHandler: () => void
}

interface UseModalProps {
    isOpen?: boolean
    animationDelay?: number
    onClose?: () => void
}

export const useModal = (props: UseModalProps): UseModalReturn => {
    const { isOpen, animationDelay = 300, onClose } = props

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
            }, animationDelay)
        }
    }, [animationDelay, onClose])

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

    return {
        isOpened,
        isClosing,
        isMounded,
        onContentClick,
        closeHandler,
    }
}
