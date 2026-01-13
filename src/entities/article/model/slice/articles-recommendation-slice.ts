import { createSlice } from '@reduxjs/toolkit'

import { fetchArticlesRecommendationById } from '../services/fetch-articles-recommendation-by-id/fetch-articles-recommendation-by-id'
import type { ArticlesRecommendationSchema } from '../types/articles-recommendation.types'

export const initialState: ArticlesRecommendationSchema = {}

const articlesRecommendationSlice = createSlice({
    name: 'articlesRecommendationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArticlesRecommendationById.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(
            fetchArticlesRecommendationById.fulfilled,
            (state, action) => {
                state.data = action.payload
                state.isLoading = false
                state.error = undefined
            },
        )
        builder.addCase(
            fetchArticlesRecommendationById.rejected,
            (state, action) => {
                state.data = undefined
                state.isLoading = false
                state.error = action.payload
            },
        )
    },
})

export const { reducer: articlesRecommendationReducer } =
    articlesRecommendationSlice
