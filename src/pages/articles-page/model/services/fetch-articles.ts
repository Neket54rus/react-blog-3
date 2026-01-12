import { createAsyncThunk } from '@reduxjs/toolkit'

import { type ArticleType, type Article } from 'entities/article'

import i18n from 'shared/config/i18n/i18n'
import { type ThunkConfig } from 'shared/lib/store/state-schema'
import { addQueryParams } from 'shared/lib/url/add-query-params/add-query-params'

import { getArticlesPageState } from '../seloctors/get-articles-page-state'

interface FetchArticlesProps {
    page?: number
    limit?: number
    replace?: boolean
    type?: ArticleType
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
    const { extra, rejectWithValue, getState } = thunkApi

    const { sort, order, search, type } = getArticlesPageState(getState())

    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        })

        const params: Record<string, string> = {
            page: page.toString(),
            limit: limit.toString(),
        }

        // Добавляем параметры сортировки, если они заданы
        if (sort) {
            params.sortBy = sort
        }

        if (order) {
            params.sortOrder = order
        }

        // Добавляем поисковый запрос, если он задан
        if (search) {
            params.search = search
        }

        if (type) {
            params.type = type
        }

        const { data } = await extra.api.get<{
            items: Article[]
            pagination: {
                hasNextPage: boolean
                hasPrevPage: boolean
                limit: number
                page: number
                totalItems: number
                totalPages: number
                sortBy?: string
                sortOrder?: string
                searchQuery?: string
            }
        }>(`articles`, { params })

        if (!data) {
            throw new Error()
        }

        return data
    } catch {
        return rejectWithValue(i18n.t('Произошла непредвиденная ошибка'))
    }
})
