import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ThunkConfig } from 'shared/lib/store/state-schema'

import { getArticlesPageState } from '../seloctors/get-articles-page-state'
import { articlesPageActions } from '../slice/articles-page-slice'

import { fetchArticles } from './fetch-articles'

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('articles-page/initArticlesPage', (_, thunkApi) => {
    const { getState, dispatch } = thunkApi

    const { page = 1, limit, _inited } = getArticlesPageState(getState())

    if (!_inited) {
        dispatch(fetchArticles({ page, limit }))
        dispatch(articlesPageActions.initState())
    }
})
