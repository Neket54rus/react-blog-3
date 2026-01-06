import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { AddCommentFormSchema } from '../types/add-comment-form'
import { addCommentForArticle } from 'pages/article-page/model/services/add-comment-for-article/add-comment-for-article'

export const initialState: AddCommentFormSchema = {
    isLoading: false
}

export const addCommentFormSlice = createSlice({
    name: 'add-comment-form',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addCommentForArticle.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addCommentForArticle.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(addCommentForArticle.rejected, (state) => {
            state.isLoading = false
        })
    },
})

export const {
    actions: addCommentFormActions,
    reducer: addCommentFormReducer,
} = addCommentFormSlice
