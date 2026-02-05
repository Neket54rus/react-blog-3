import { type JSX } from 'react'

import { classNames } from 'shared/lib/class-names'

import classes from './spinner.module.scss'

interface SpinnerProps {
    className?: string
}

/**
 * @deprecated
 */
export const Spinner = (props: SpinnerProps): JSX.Element => {
    const { className } = props

    return <span className={classNames(classes.spinner, {}, [className])} />
}
