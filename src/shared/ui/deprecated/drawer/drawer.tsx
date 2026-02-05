import { memo, useCallback, useEffect, type ReactNode } from 'react'

import { classNames } from 'shared/lib/class-names'
import {
    AnimationProvider,
    useAnimationLibs,
} from 'shared/lib/components/animation-provider/animation-provider'
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

const height = window.innerHeight - 100

export const DrawerContent = memo((props: DrawerProps) => {
    const { className, children, isOpen = false, lazy, onClose } = props

    const { Spring, Gesture } = useAnimationLibs()
    const [{ y }, api] = Spring!.useSpring(() => ({ y: height }))

    const { isClosing, isMounded, isOpened, onContentClick, closeHandler } =
        useModal({ isOpen, onClose })

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false })
    }, [api])

    useEffect(() => {
        if (isOpen) {
            openDrawer()
        }
    }, [isOpen, openDrawer])

    const close = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring!.config.stiff, velocity },
            onResolve: closeHandler,
        })
    }

    const bind = Gesture!.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel()

            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close()
                } else {
                    openDrawer()
                }
            } else {
                api.start({ y: my, immediate: true })
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    )

    if (!isOpen) {
        return null
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'))

    // if (!isMounded && lazy) {
    //     return null
    // }

    return (
        <Portal>
            <div
                className={classNames(
                    classes.drawer,
                    { [classes.opened]: isOpen },
                    [className],
                )}
            >
                <div className={classes.drawerOverlay} onClick={close}>
                    {Spring && (
                        <Spring.a.div
                            className={classes.sheet}
                            style={{
                                display,
                                bottom: `calc(-100vh + ${height - 100}px)`,
                                y,
                            }}
                            {...bind()}
                        >
                            {children}
                        </Spring.a.div>
                    )}
                </div>
            </div>
        </Portal>
    )
})

const DrawerAsync = memo((props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs()

    if (!isLoaded) {
        return null
    }

    return <DrawerContent {...props} />
})

export const Drawer = memo((props: DrawerProps) => (
    <AnimationProvider>
        <DrawerAsync {...props} />
    </AnimationProvider>
))
