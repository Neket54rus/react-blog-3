import { createAsyncThunk } from '@reduxjs/toolkit'

import i18n from 'shared/config/i18n/i18n'
import { type ThunkConfig } from 'shared/lib/store/state-schema'

import type { Comment } from '../../types/comment.types'

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string,
    ThunkConfig<string>
>('comment/fetchCommentsByArticleId', async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
        const { data } = await extra.api.get<Comment[]>(`comments/${articleId}`)

        if (!data) {
            throw new Error()
        }

        return data
    } catch {
        return rejectWithValue(i18n.t('Произошла непредвиденная ошибка'))
    }
})
