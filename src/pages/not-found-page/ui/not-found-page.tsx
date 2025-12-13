import { type JSX } from 'react'
import { useTranslation } from 'react-i18next'

import classes from './not-found.page.module.scss'

const NotFoundPage = (): JSX.Element => {
    const { t } = useTranslation('not-found')

    return (
        <div className={classes.notFoundPage}>{t('Страница не найдена')}</div>
    )
}

export default NotFoundPage
