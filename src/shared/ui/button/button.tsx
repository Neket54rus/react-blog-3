import type { ButtonHTMLAttributes, JSX } from 'react'

import { classNames } from 'shared/lib/class-names'

import classes from './button.module.scss'
import { ButtonSize, ButtonTheme } from './constants'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: ButtonTheme
    square?: boolean
    size?: ButtonSize
}

export const Button = (props: ButtonProps): JSX.Element => {
    const {
        theme = ButtonTheme.CLEAR,
        square = false,
        size = ButtonSize.M,
        children,
        className,
        ...otherProps
    } = props

    return (
        <button
            className={classNames(
                classes.button,
                {
                    [classes.square]: square,
                },
                [className, classes[theme], classes[size]],
            )}
            {...otherProps}
        >
            {children}
        </button>
    )
}
