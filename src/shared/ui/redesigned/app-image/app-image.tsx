import {
    type ImgHTMLAttributes,
    memo,
    type ReactNode,
    useLayoutEffect,
    useState,
} from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string
    fallback?: ReactNode
    errorFallback?: ReactNode
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        alt = 'image',
        fallback,
        errorFallback,
        src,
        ...otherProps
    } = props

    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useLayoutEffect(() => {
        const img = new Image()
        img.src = src ?? ''
        img.onload = (): void => {
            setIsLoading(false)
        }
        img.onerror = (): void => {
            setIsLoading(false)
            setHasError(true)
        }
    }, [src])

    if (isLoading) {
        return fallback || 'Loading...'
    }

    if (hasError) {
        return errorFallback || 'Error'
    }

    return <img className={className} alt={alt} src={src} {...otherProps} />
})
