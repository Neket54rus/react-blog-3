import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type ArticleType, ArticleView } from 'entities/article'

import type { SortOrder } from 'shared/types/types'

import { type ArticlesSort } from '../constants/articles-page.constants'
import { fetchArticles } from '../services/fetch-articles'
import type { ArticlesPageSchema } from '../types/articles-page.types'

export const initialState: ArticlesPageSchema = {
    view: ArticleView.SMALL,
}

export const articlesPageSlice = createSlice({
    name: 'article-page-slice',
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload
            localStorage.setItem('articles_view', action.payload)
        },
        initState: (state) => {
            const view =
                localStorage.getItem('articles_view') || ArticleView.SMALL
            state.view = view as ArticleView
            state.limit = view === ArticleView.BIG ? 5 : 10
            state._inited = true
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload
        },
        setSort: (state, action: PayloadAction<ArticlesSort>) => {
            state.sort = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            if (action.payload == state.type) {
                state.type = undefined
            } else {
                state.type = action.payload
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticles.pending, (state, action) => {
            state.isLoading = true
            state.error = undefined

            if (action.meta.arg.replace) {
                state.articles = []
            }
        })
        builder.addCase(fetchArticles.fulfilled, (state, action) => {
            state.isLoading = false
            state.hasMore = action.payload.pagination.hasNextPage

            if (!action.meta.arg.replace) {
                state.articles = state.articles
                    ? [...state.articles, ...action.payload.items]
                    : action.payload.items
            } else {
                state.articles = action.payload.items
            }
        })
        builder.addCase(fetchArticles.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const { actions: articlesPageActions, reducer: articlesPageReducer } =
    articlesPageSlice
