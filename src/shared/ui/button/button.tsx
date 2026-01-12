import { type ButtonHTMLAttributes, type JSX } from 'react'

import { classNames } from 'shared/lib/class-names'

import classes from './button.module.scss'
import { ButtonSize, ButtonTheme } from './constants'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: ButtonTheme
    square?: boolean
    size?: ButtonSize
    active?: boolean
}

export const Button = (props: ButtonProps): JSX.Element => {
    const {
        theme = ButtonTheme.CLEAR,
        square = false,
        size = ButtonSize.M,
        children,
        className,
        disabled = false,
        active = false,
        ...otherProps
    } = props

    return (
        <button
            className={classNames(
                classes.button,
                {
                    [classes.square]: square,
                    [classes.disabled]: disabled,
                    [classes.active]: active,
                },
                [className, classes[theme], classes[size]],
            )}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    )
}
