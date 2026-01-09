import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { ArticleView } from 'entities/article'

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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticles.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(fetchArticles.fulfilled, (state, action) => {
            state.isLoading = false
            state.articles = state.articles
                ? [...state.articles, ...action.payload.items]
                : action.payload.items
            state.hasMore = action.payload.pagination.hasNextPage
        })
        builder.addCase(fetchArticles.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const { actions: articlesPageActions, reducer: articlesPageReducer } =
    articlesPageSlice
