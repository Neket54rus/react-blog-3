/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react'

type UseThrottleResult = (...args: any[]) => void

export const useThrottle = (
    callback: (...args: any[]) => void,
    delay: number,
): UseThrottleResult => {
    const throttleRef = useRef(false)

    return useCallback(
        (...args: any[]) => {
            if (!throttleRef.current) {
                callback(...args)
                throttleRef.current = true

                setTimeout(() => {
                    throttleRef.current = false
                }, delay)
            }
        },
        [callback, delay],
    )
}
