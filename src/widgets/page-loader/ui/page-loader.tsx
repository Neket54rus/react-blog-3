import { type JSX } from 'react'

import { classNames } from 'shared/lib/class-names'
import { Spinner } from 'shared/ui/spinner'

import classes from './page-loader.module.scss'

interface PageLoaderProps {
    className?: string
}

export const PageLoader = (props: PageLoaderProps): JSX.Element => {
    const { className } = props

    return (
        <div className={classNames(classes.pageLoader, {}, [className])}>
            <Spinner />
        </div>
    )
}
