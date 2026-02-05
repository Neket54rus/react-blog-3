import { type CSSProperties, memo, useMemo, type JSX } from 'react'

import AvatarIcon from 'shared/assets/icons/avatar.svg?react'
import { classNames } from 'shared/lib/class-names'

import classes from './avatar.module.scss'

interface AvatarProps {
    src?: string
    size?: number
    className?: string
}

export const Avatar = memo((props: AvatarProps): JSX.Element => {
    const { src, size = 124, className } = props

    const styles: CSSProperties = useMemo(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    )

    return src ? (
        <img
            className={classNames(classes.avatar, {}, [className])}
            src={src}
            alt="avatart"
            style={styles}
        />
    ) : (
        <AvatarIcon className={classNames(classes.avatar, {}, [className])} />
    )
})
