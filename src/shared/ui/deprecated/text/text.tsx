import { memo, type JSX } from 'react'

import { classNames } from 'shared/lib/class-names'

import { ColorText, SizeText } from './text.constants'
import classes from './text.module.scss'

interface TextProps {
    children: string
    color?: ColorText
    size?: SizeText
    className?: string
    dataTestId?: string
}

/**
 * @deprecated
 */
export const Text = memo((props: TextProps): JSX.Element => {
    const {
        children,
        color = ColorText.PRIMARY,
        size = SizeText.M,
        className,
        dataTestId = 'text',
    } = props

    return (
        <p
            data-testid={dataTestId}
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
