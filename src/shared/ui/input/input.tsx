import {
    type ChangeEvent,
    type InputHTMLAttributes,
    type JSX,
    memo,
    useEffect,
    useRef,
} from 'react'

import { classNames } from 'shared/lib/class-names'

import classes from './input.module.scss'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
>

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string
    autofocus?: boolean
    onChange?: (value: string) => void
}

export const Input = memo((props: InputProps): JSX.Element => {
    const {
        className,
        value,
        type = 'text',
        autofocus,
        onChange,
        ...otherProps
    } = props

    const inputRef = useRef<HTMLInputElement>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        onChange?.(event.target.value)
    }

    useEffect(() => {
        if (autofocus) {
            inputRef.current?.focus()
        }
    }, [autofocus])

    return (
        <input
            className={classNames(classes.input, {}, [className])}
            type={type}
            value={value}
            onChange={onChangeHandler}
            ref={inputRef}
            {...otherProps}
        />
    )
})
