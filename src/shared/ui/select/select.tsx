import { type ChangeEvent, memo, type JSX } from 'react'

import { classNames } from 'shared/lib/class-names'
import { Text } from 'shared/ui/text'

import classes from './select.module.scss'
import { type SelectOption } from './types'

interface SelectProps {
    label?: string
    options?: SelectOption[]
    value?: string
    onChange?: (value: string) => void
    className?: string
}

export const Select = memo((props: SelectProps): JSX.Element => {
    const { label, options, value, onChange, className } = props

    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        if (onChange) {
            onChange(event.target.value)
        }
    }

    return (
        <div className={classNames(classes.wrapper, {}, [className])}>
            {label && <Text>{label}</Text>}
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
})
