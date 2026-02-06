import { type ButtonHTMLAttributes, type JSX } from 'react'

import { classNames } from 'shared/lib/class-names'

import classes from './button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'clear' | 'outline'
    square?: boolean
    size?: 'size_m' | 'size_l' | 'size_xl'
    active?: boolean
    dataTestId?: string
}

export const Button = (props: ButtonProps): JSX.Element => {
    const {
        variant = 'clear',
        square = false,
        size = 'size_m',
        children,
        className,
        disabled = false,
        active = false,
        dataTestId = 'button',
        ...otherProps
    } = props

    return (
        <button
            data-testid={dataTestId}
            className={classNames(
                classes.button,
                {
                    [classes.square]: square,
                    [classes.disabled]: disabled,
                    [classes.active]: active,
                },
                [className, classes[variant], classes[size]],
            )}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    )
}
