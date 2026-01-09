import { type RefObject, useEffect } from 'react'

interface UseInfiniteScrollProps {
    callback?: () => void
    triggerRef?: RefObject<HTMLElement | null>
    wrapperRef?: RefObject<HTMLElement | null>
}

export const useInfiniteScroll = (props: UseInfiniteScrollProps): void => {
    const { triggerRef, wrapperRef, callback } = props

    useEffect(() => {
        let observer: IntersectionObserver | null = null

        if (callback) {
            const options = {
                root: wrapperRef?.current,
                rootMargin: '0px',
                threshold: 1.0,
            }

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback()
                }
            }, options)

            if (triggerRef && triggerRef.current) {
                observer.observe(triggerRef.current)
            }
        }

        return (): void => {
            if (observer && triggerRef && triggerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerRef?.current)
            }
        }
    }, [callback, triggerRef, wrapperRef])
}
