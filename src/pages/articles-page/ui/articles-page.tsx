import { memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { CardViewsSwitcher } from 'features/card-views-switcher'

import { ArticleList, ArticleView } from 'entities/article'

import {
    DynamicModuleLoader,
    type ReducersList,
} from 'shared/lib/components/dynamic-module-loader/dynamic-module-loader'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { Page } from 'shared/ui/page'
import { Select } from 'shared/ui/select'
import { Spinner } from 'shared/ui/spinner'

import { getArticlesPageState } from '../model/seloctors/get-articles-page-state'
import { fetchArticles } from '../model/services/fetch-articles'
import { fetchArticlesNextPage } from '../model/services/fetch-articles-next-page'
import {
    articlesPageActions,
    articlesPageReducer,
} from '../model/slice/articles-page-slice'

import classes from './articles-page.module.scss'

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage = memo(() => {
    const dispatch = useAppDispatch()
    const {
        articles,
        view,
        isLoading,
        page = 1,
        limit,
    } = useSelector(getArticlesPageState)

    useEffect(() => {
        dispatch(fetchArticles({ page, limit }))
        dispatch(articlesPageActions.initState())
    }, [dispatch, limit, page])

    const onChangeView = useCallback(() => {
        dispatch(
            articlesPageActions.setView(
                view === ArticleView.BIG ? ArticleView.SMALL : ArticleView.BIG,
            ),
        )
    }, [dispatch, view])

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchArticlesNextPage())
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page onScrollEnd={onLoadNextPart}>
                <div className={classes.articlesPageHeader}>
                    <Select label="Сортировать ПО" />
                    {view && (
                        <CardViewsSwitcher onClick={onChangeView} view={view} />
                    )}
                </div>
                <ArticleList
                    articles={articles}
                    view={view}
                    loading={isLoading}
                />
                {isLoading && (
                    <div className={classes.loading}>
                        <Spinner />
                    </div>
                )}
            </Page>
        </DynamicModuleLoader>
    )
})

export default ArticlesPage
