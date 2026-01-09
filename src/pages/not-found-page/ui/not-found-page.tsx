import { type JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { Page } from 'widgets/page'

import classes from './not-found.page.module.scss'

const NotFoundPage = (): JSX.Element => {
    const { t } = useTranslation('not-found')

    return (
        <Page className={classes.notFoundPage}>{t('Страница не найдена')}</Page>
    )
}

export default NotFoundPage
