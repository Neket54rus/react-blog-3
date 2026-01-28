import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { ArticleSortSelector } from 'features/article-sort-selector'
import { ArticleTypeTabs } from 'features/article-type-tabs'
import { CardViewsSwitcher } from 'features/card-views-switcher'

import { ArticleView } from 'entities/article'

import { classNames } from 'shared/lib/class-names'
import { useDebounce } from 'shared/lib/hooks/use-debounce/use-debounce'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { type SortOrder } from 'shared/types/types'
import { Input } from 'shared/ui/input'

import { type ArticlesSort } from '../../model/constants/articles-page.constants'
import { getArticlesPageState } from '../../model/seloctors/get-articles-page-state'
import { fetchArticles } from '../../model/services/fetch-articles'
import { articlesPageActions } from '../../model/slice/articles-page-slice'

import classes from './articles-page-filters.module.scss'

interface ArticlesPageFiltersProps {
    className?: string
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const { className } = props

    const dispatch = useAppDispatch()
    const { view, sort, order, search, page, limit } =
        useSelector(getArticlesPageState)

    const debouncedOnChangeSearch = useDebounce(
        () => dispatch(fetchArticles({ page, limit, replace: true })),
        500,
    )

    const onChangeView = useCallback(() => {
        dispatch(
            articlesPageActions.setView(
                view === ArticleView.BIG ? ArticleView.SMALL : ArticleView.BIG,
            ),
        )
    }, [dispatch, view])

    const onChangeSort = useCallback(
        (newSort: ArticlesSort) => {
            dispatch(articlesPageActions.setSort(newSort))
            dispatch(articlesPageActions.setPage(1))
            dispatch(fetchArticles({ page, limit, replace: true }))
        },
        [dispatch, limit, page],
    )

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(articlesPageActions.setOrder(newOrder))
            dispatch(articlesPageActions.setPage(1))
            dispatch(fetchArticles({ page, limit, replace: true }))
        },
        [dispatch, limit, page],
    )

    const onChangeSearch = useCallback(
        (newSearh: string) => {
            dispatch(articlesPageActions.setSearch(newSearh))
            dispatch(articlesPageActions.setPage(1))
            debouncedOnChangeSearch()
        },
        [debouncedOnChangeSearch, dispatch],
    )

    return (
        <div
            className={classNames(classes.articlesPageFilters, {}, [className])}
        >
            <ArticleSortSelector
                sort={sort}
                order={order}
                onChangeSort={onChangeSort}
                onChangeOrder={onChangeOrder}
            />
            {view && <CardViewsSwitcher onClick={onChangeView} view={view} />}
            <Input
                className={classes.articlesPageFiltersInput}
                placeholder="Поиск..."
                value={search}
                onChange={onChangeSearch}
            />
            <ArticleTypeTabs className={classes.articlesPageFiltersTabs} />
        </div>
    )
})
