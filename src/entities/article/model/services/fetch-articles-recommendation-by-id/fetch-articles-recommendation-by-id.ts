import { createAsyncThunk } from '@reduxjs/toolkit'

import { type Article } from 'entities/article'

import i18n from 'shared/config/i18n/i18n'
import { type ThunkConfig } from 'shared/lib/store/state-schema'

export const fetchArticlesRecommendationById = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>('article/fetchArticlesRecommendationById', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
        const params: Record<string, string> = {
            limit: '4',
        }

        const {
            data: { items },
        } = await extra.api.get<{ items: Article[] }>(`articles`, { params })

        if (!items) {
            throw new Error()
        }

        return items
    } catch {
        return rejectWithValue(i18n.t('Произошла непредвиденная ошибка'))
    }
})
