import { memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router'

import { Page } from 'widgets/page'

import { ArticleList } from 'entities/article'

import {
    DynamicModuleLoader,
    type ReducersList,
} from 'shared/lib/components/dynamic-module-loader/dynamic-module-loader'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { Spinner } from 'shared/ui/spinner'

import { getArticlesPageState } from '../model/seloctors/get-articles-page-state'
import { fetchArticlesNextPage } from '../model/services/fetch-articles-next-page'
import { initArticlesPage } from '../model/services/init-articles-page'
import { articlesPageReducer } from '../model/slice/articles-page-slice'

import { ArticlesPageFilters } from './articles-page-filters/articles-page-filters'
import classes from './articles-page.module.scss'

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage = memo(() => {
    const [searchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    const { articles, view, isLoading } = useSelector(getArticlesPageState)

    useEffect(() => {
        dispatch(initArticlesPage(searchParams))
    }, [dispatch, searchParams])

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchArticlesNextPage())
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page onScrollEnd={onLoadNextPart}>
                <ArticlesPageFilters />
                <ArticleList
                    articles={articles}
                    view={view}
                    loading={isLoading}
                    virtualized
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
