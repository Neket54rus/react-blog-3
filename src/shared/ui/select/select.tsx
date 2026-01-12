import { type ChangeEvent, type JSX } from 'react'

import { classNames } from 'shared/lib/class-names'
import { Text } from 'shared/ui/text'

import classes from './select.module.scss'
import { type SelectOption } from './types'

interface SelectProps<T extends string> {
    label?: string
    options?: SelectOption<T>[]
    value?: T
    onChange?: (value: T) => void
    className?: string
}

export const Select = <T extends string>(
    props: SelectProps<T>,
): JSX.Element => {
    const { label, options, value, onChange, className } = props

    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        if (onChange) {
            onChange(event.target.value as T)
        }
    }

    return (
        <div className={classNames(classes.wrapper, {}, [className])}>
            {label && <Text className={classes.label}>{label}</Text>}
            <select
                className={classes.select}
                value={value}
                onChange={onChangeHandler}
            >
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.content}
                    </option>
                ))}
            </select>
        </div>
    )
}
