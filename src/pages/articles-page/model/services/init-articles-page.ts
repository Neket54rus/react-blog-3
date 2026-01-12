import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from 'shared/lib/store/state-schema'
import type { SortOrder } from 'shared/types/types'

import { type ArticlesSort } from '../constants/articles-page.constants'
import { getArticlesPageState } from '../seloctors/get-articles-page-state'
import { articlesPageActions } from '../slice/articles-page-slice'

import { fetchArticles } from './fetch-articles'

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articles-page/initArticlesPage', (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi

    const { page = 1, limit, _inited } = getArticlesPageState(getState())

    if (!_inited) {
        const orderFromUrl = searchParams.get('order') as SortOrder
        const sortFromUrl = searchParams.get('sort') as ArticlesSort
        const searchFromUrl = searchParams.get('search')

        if (orderFromUrl) {
            dispatch(articlesPageActions.setOrder(orderFromUrl))
        }

        if (sortFromUrl) {
            dispatch(articlesPageActions.setSort(sortFromUrl))
        }

        if (searchFromUrl) {
            dispatch(articlesPageActions.setSearch(searchFromUrl))
        }

        dispatch(fetchArticles({ page, limit }))
        dispatch(articlesPageActions.initState())
    }
})
