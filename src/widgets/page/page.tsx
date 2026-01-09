import { memo, useRef, type ReactNode, type UIEvent } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'

import { UIActions, getUIScrollByPath } from 'features/ui'

import { classNames } from 'shared/lib/class-names'
import { useInfiniteScroll } from 'shared/lib/hooks/use-infinite-scroll/use-infinite-scroll'
import { useInitialEffect } from 'shared/lib/hooks/use-initial-effect/use-initial-effect'
import { type StateSchema } from 'shared/lib/store/state-schema'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { ColorText, SizeText, Text } from 'shared/ui/text'

import classes from './page.module.scss'
import { useThrottle } from 'shared/lib/hooks/use-throttle/use-throttle'

interface PageProps {
    children?: ReactNode
    className?: string
    onScrollEnd?: () => void
}

export const Page = memo((props: PageProps) => {
    const { children, className, onScrollEnd } = props

    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const triggerRef = useRef<HTMLDivElement | null>(null)
    const { pathname } = useLocation()
    const scrollPosition = useSelector((state: StateSchema) =>
        getUIScrollByPath(state, pathname),
    )
    const dispath = useAppDispatch()

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    })

    const onScroll = useThrottle((event: UIEvent<HTMLDivElement>): void => {
        console.log('scroll')
        dispath(
            UIActions.setScrollPosition({
                path: pathname,
                position: event.currentTarget.scrollTop,
            }),
        )
    }, 500)

    useInitialEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollTop = scrollPosition
        }
    })

    if (!children) {
        return (
            <Text size={SizeText.L} color={ColorText.ERROR}>
                Ошибка! Обратитесь к саппорту
            </Text>
        )
    }

    return (
        <section
            className={classNames(classes.page, {}, [className])}
            ref={wrapperRef}
            onScroll={onScroll}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    )
})
