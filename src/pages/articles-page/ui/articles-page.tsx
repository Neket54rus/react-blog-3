import { memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { CardViewsSwitcher } from 'features/card-views-switcher'

import { ArticleList, ArticleView } from 'entities/article'

import {
    DynamicModuleLoader,
    type ReducersList,
} from 'shared/lib/components/dynamic-module-loader/dynamic-module-loader'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { Select } from 'shared/ui/select'

import { getArticlesPageState } from '../model/seloctors/get-articles-page-state'
import { fetchArticles } from '../model/services/fetch-articles'
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
    const { articles, view, isLoading } = useSelector(getArticlesPageState)

    useEffect(() => {
        dispatch(fetchArticles())
        dispatch(articlesPageActions.initState())
    }, [dispatch])

    const onChangeView = useCallback(() => {
        dispatch(
            articlesPageActions.setView(
                view === ArticleView.BIG ? ArticleView.SMALL : ArticleView.BIG,
            ),
        )
    }, [dispatch, view])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classes.articlesPageHeader}>
                <Select label="Сортировать ПО" />
                {view && (
                    <CardViewsSwitcher onClick={onChangeView} view={view} />
                )}
            </div>
            <ArticleList articles={articles} view={view} loading={isLoading} />
        </DynamicModuleLoader>
    )
})

export default ArticlesPage
