import { createSlice } from '@reduxjs/toolkit'

import { fetchCommentsByArticleId } from '../services/fetch-comments-by-article-id/fetch-comments-by-article-id'
import type { CommentsSchema } from '../types/comment.types'

export const initialState: CommentsSchema = {
    isLoading: false,
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCommentsByArticleId.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const { actions: commentsAction, reducer: commentsReducer } =
    commentsSlice
