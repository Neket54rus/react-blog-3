import { memo, type JSX } from 'react'

import { classNames } from 'shared/lib/class-names'

import classes from './text.module.scss'

interface TextProps {
    children: string
    color?: 'accent' | 'error'
    size?: 'size_m' | 'size_l' | 'size_xl'
    weight?: string | number
    className?: string
    dataTestId?: string
}

export const Text = memo((props: TextProps): JSX.Element => {
    const {
        children,
        color,
        size = 'size_m',
        weight,
        className,
        dataTestId = 'text',
    } = props

    return (
        <p
            data-testid={dataTestId}
            className={classNames(classes.text, {}, [
                className,
                color && classes[color],
                classes[size],
            ])}
            style={{
                fontWeight: weight,
            }}
        >
            {children}
        </p>
    )
})
