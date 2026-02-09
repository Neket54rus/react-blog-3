import { type HTMLAttributes, memo, type ReactNode } from 'react'

import { classNames } from 'shared/lib/class-names'

import classes from './card.module.scss'

export type CardVariant = 'normal' | 'outlined' | 'light'
export type CardPadding = '0' | '8' | '16' | '24'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children: ReactNode
    variant?: CardVariant
    max?: boolean
    padding?: CardPadding
}

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        variant = 'normal',
        max = false,
        padding = '8',
        ...otherProps
    } = props

    const paddingClass = mapPaddingToClass[padding]

    return (
        <div
            className={classNames(classes.Card, { [classes.max]: max }, [
                className,
                classes[variant],
                classes[paddingClass],
            ])}
            {...otherProps}
        >
            {children}
        </div>
    )
})
