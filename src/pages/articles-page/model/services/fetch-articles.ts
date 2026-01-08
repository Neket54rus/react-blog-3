import { createAsyncThunk } from '@reduxjs/toolkit'

import { type Article } from 'entities/article'

import i18n from 'shared/config/i18n/i18n'
import { type ThunkConfig } from 'shared/lib/store/state-schema'

export const fetchArticles = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>('articles-page/fetchArticles', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
        const { data } = await extra.api.get<Article[]>('articles')

        if (!data) {
            throw new Error()
        }

        return data
    } catch {
        return rejectWithValue(i18n.t('Произошла непредвиденная ошибка'))
    }
})
