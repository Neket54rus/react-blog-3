/* eslint-disable @typescript-eslint/no-explicit-any */
import { type RefObject, useCallback, useRef } from 'react'

type UseDebounceResult = (...args: any[]) => void

export const useDebounce = (
    callback: (...args: any[]) => void,
    delay: number,
): UseDebounceResult => {
    const timer = useRef(null) as RefObject<any>

    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current)
            }

            timer.current = setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay],
    )
}
