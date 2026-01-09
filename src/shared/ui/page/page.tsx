import { memo, useRef, type ReactNode } from 'react'

import { classNames } from 'shared/lib/class-names'
import { useInfiniteScroll } from 'shared/lib/hooks/use-infinite-scroll/use-infinite-scroll'

import { ColorText, SizeText, Text } from '../text'

import classes from './page.module.scss'

interface PageProps {
    children?: ReactNode
    className?: string
    onScrollEnd?: () => void
}

export const Page = memo((props: PageProps) => {
    const { children, className, onScrollEnd } = props

    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const triggerRef = useRef<HTMLDivElement | null>(null)

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    })

    if (!children) {
        return (
            <Text size={SizeText.L} color={ColorText.ERROR}>
                Ошибка! Обратитесь к саппорту
            </Text>
        )
    }

    return (
        <div
            className={classNames(classes.page, {}, [className])}
            ref={wrapperRef}
        >
            {children}
            <div ref={triggerRef} />
        </div>
    )
})
