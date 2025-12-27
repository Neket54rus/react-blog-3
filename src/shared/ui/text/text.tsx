import { memo, type JSX } from 'react'

import { classNames } from 'shared/lib/class-names'

import { ColorText, SizeText } from './text.constants'
import classes from './text.module.scss'

interface TextProps {
    children: string
    color?: ColorText
    size?: SizeText
    className?: string
}

export const Text = memo((props: TextProps): JSX.Element => {
    const {
        children,
        color = ColorText.PRIMARY,
        size = SizeText.M,
        className,
    } = props

    return (
        <p
            className={classNames(classes.text, {}, [
                className,
                classes[color],
                classes[size],
            ])}
        >
            {children}
        </p>
    )
})
