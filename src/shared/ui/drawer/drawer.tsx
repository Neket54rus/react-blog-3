import { memo, type ReactNode } from 'react'

import { classNames } from 'shared/lib/class-names'

import { Overlay } from '../overlay'
import { Portal } from '../portal/portal'

import classes from './drawer.module.scss'

interface DrawerProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

export const Drawer = memo((props: DrawerProps) => {
    const { className, children, isOpen = false, onClose } = props

    return (
        <Portal>
            <div
                className={classNames(
                    classes.drawer,
                    { [classes.opened]: isOpen },
                    [className],
                )}
            >
                <Overlay onClick={onClose} />
                <div
                    className={classNames(classes.drawerContent, {
                        [classes.opened]: isOpen,
                    })}
                >
                    {children}
                </div>
            </div>
        </Portal>
    )
})
