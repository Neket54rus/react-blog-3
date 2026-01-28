import { memo, type JSX } from 'react'

import { Select, type SelectOption } from 'shared/ui/select'

interface CurrencySelectProps {
    options: SelectOption<string>[]
    value?: string
    onChange?: (value: string) => void
    className?: string
}

export const CurrencySelect = memo(
    (props: CurrencySelectProps): JSX.Element => {
        const { options, value, onChange, className } = props

        return (
            <Select
                className={className}
                options={options}
                onChange={onChange}
                value={value}
            />
        )
    },
)
