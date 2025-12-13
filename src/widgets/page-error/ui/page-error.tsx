import { type JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/class-names'

import classes from './page-error.module.scss'

interface PageErrorProps {
    className?: string
}

export const PageError = (props: PageErrorProps): JSX.Element => {
    const { className } = props

    const { t } = useTranslation()

    const reloadPage = (): void => {
        location.reload()
    }

    return (
        <div className={classNames(classes.pageError, {}, [className])}>
            <p>{t('Произошла непредвиденная ошибка')}</p>
            <button onClick={reloadPage}>{t('Обновить страницу')}</button>
        </div>
    )
}
