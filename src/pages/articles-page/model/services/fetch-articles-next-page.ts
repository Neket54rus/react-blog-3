import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from 'shared/lib/store/state-schema'

import { getArticlesPageState } from '../seloctors/get-articles-page-state'
import { articlesPageActions } from '../slice/articles-page-slice'

import { fetchArticles } from './fetch-articles'

export const fetchArticlesNextPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('articles-page/fetchArticlesNextPage', async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi

    const { hasMore, page = 1, isLoading } = getArticlesPageState(getState())

    if (hasMore && !isLoading) {
        dispatch(articlesPageActions.setPage(page + 1))
        dispatch(fetchArticles({ page: page + 1 }))
    }
})
