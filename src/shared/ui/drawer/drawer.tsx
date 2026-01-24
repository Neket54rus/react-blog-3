import { memo, type ReactNode } from 'react'

import { classNames } from 'shared/lib/class-names'
import { useModal } from 'shared/lib/hooks/use-modal/use-modal'

import { Portal } from '../portal/portal'

import classes from './drawer.module.scss'

interface DrawerProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

export const Drawer = memo((props: DrawerProps) => {
    const { className, children, isOpen = false, lazy, onClose } = props

    const { isClosing, isMounded, isOpened, onContentClick, closeHandler } =
        useModal({ isOpen, onClose })

    if (!isMounded && lazy) {
        return null
    }

    return (
        <Portal>
            <div
                className={classNames(
                    classes.drawer,
                    { [classes.opened]: isOpen },
                    [className],
                )}
            >
                <div className={classes.drawerOverlay} onClick={closeHandler}>
                    <div
                        className={classNames(classes.drawerContent, {
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
})
