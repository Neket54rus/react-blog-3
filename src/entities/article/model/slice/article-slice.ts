import { createSlice } from '@reduxjs/toolkit'

import { fetchArticleById } from '../services/fetch-article-by-id/fetch-article-by-id'
import { type ArticleSchema } from '../types/article.types'

export const initialState: ArticleSchema = {
    isLoading: false,
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArticleById.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(fetchArticleById.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchArticleById.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const { actions: articleAction, reducer: articleReducer } = articleSlice
