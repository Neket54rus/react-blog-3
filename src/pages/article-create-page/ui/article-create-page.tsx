import { memo } from 'react'
import { useParams } from 'react-router'

import { Page } from 'widgets/page'

import { classNames } from 'shared/lib/class-names'

import classes from './article-create-page.module.scss'

interface ArticleCreatePageProps {
    className?: string
}

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props

    const { id } = useParams<{ id: string }>()

    const isEdit = !!id

    return (
        <Page
            className={classNames(classes.articleCreatePage, {}, [className])}
        >
            {isEdit ? 'Edit' : 'Create'}
        </Page>
    )
})

export default ArticleCreatePage
