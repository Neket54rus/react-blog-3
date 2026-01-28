import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { articlesPageActions, fetchArticles } from 'pages/articles-page'
import { getArticlesPageState } from 'pages/articles-page/model/seloctors/get-articles-page-state'

import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { type TabItem, Tabs } from 'shared/ui/tabs/tabs'

import { ArticleType } from '../../../entities/article/model/constants/article.constants'

const tabs = Object.values(ArticleType).map((value) => ({
    value,
    content: value,
}))

interface ArticleTypeTabsProps {
    className?: string
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className } = props

    const dispatch = useAppDispatch()
    const { page, limit, type } = useSelector(getArticlesPageState)

    const handlerTabClick = useCallback(
        (tab: TabItem<ArticleType>) => {
            dispatch(articlesPageActions.setType(tab.value))
            dispatch(articlesPageActions.setPage(1))
            dispatch(fetchArticles({ page, limit, replace: true }))
        },
        [dispatch, limit, page],
    )

    return (
        <Tabs<ArticleType>
            className={className}
            tabs={tabs}
            onTabClick={handlerTabClick}
            value={type}
        />
    )
})
