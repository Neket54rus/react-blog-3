import { createAsyncThunk } from '@reduxjs/toolkit'

import { type Article } from 'entities/article'

import i18n from 'shared/config/i18n/i18n'
import { type ThunkConfig } from 'shared/lib/store/state-schema'

interface FetchArticlesProps {
    page?: number
    limit?: number
}

interface FetchArticlesResult {
    items: Article[]
    pagination: {
        hasNextPage: boolean
        hasPrevPage: boolean
        limit: number
        page: number
        totalItems: number
        totalPages: number
    }
}

export const fetchArticles = createAsyncThunk<
    FetchArticlesResult,
    FetchArticlesProps,
    ThunkConfig<string>
>('articles-page/fetchArticles', async (props, thunkApi) => {
    const { page = 1, limit = 10 } = props
    const { extra, rejectWithValue } = thunkApi

    try {
        const { data } = await extra.api.get<{
            items: Article[]
            pagination: {
                hasNextPage: boolean
                hasPrevPage: boolean
                limit: number
                page: number
                totalItems: number
                totalPages: number
            }
        }>(`articles?page=${page}&limit=${limit}`)

        if (!data) {
            throw new Error()
        }

        return data
    } catch {
        return rejectWithValue(i18n.t('Произошла непредвиденная ошибка'))
    }
})
