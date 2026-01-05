import { createAsyncThunk } from '@reduxjs/toolkit'

import i18n from 'shared/config/i18n/i18n'
import { type ThunkConfig } from 'shared/lib/store/state-schema'

import { type Article } from '../../types/article.types'

export const fetchArticleById = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>('article/fetchArticleById', async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
        const { data } = await extra.api.get<Article>(`articles/${articleId}`)

        if (!data) {
            throw new Error()
        }

        return data
    } catch {
        return rejectWithValue(i18n.t('Произошла непредвиденная ошибка'))
    }
})
