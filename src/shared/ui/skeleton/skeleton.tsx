import { type CSSProperties, memo, useMemo } from 'react'

import { classNames } from 'shared/lib/class-names'

import classes from './skeleton.module.scss'

interface SkeletonProps {
    height?: string | number
    width?: string | number
    border?: string
    className?: string
}

export const Skeleton = memo((props: SkeletonProps) => {
    const { height, width, border, className } = props

    const styles: CSSProperties = useMemo(
        () => ({
            height,
            width,
            borderRadius: border,
        }),
        [border, height, width],
    )

    return (
        <div
            className={classNames(classes.skeleton, {}, [className])}
            style={styles}
        />
    )
})
